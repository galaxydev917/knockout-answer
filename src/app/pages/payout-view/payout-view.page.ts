import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { PaymentService } from '../../services/payment/payment.service';
import {  LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-payout-view',
  templateUrl: './payout-view.page.html',
  styleUrls: ['./payout-view.page.scss'],
})
export class PayoutViewPage implements OnInit {
  options : InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'fullscreen',//iOS only 
    fullscreen : 'yes',//Windows only    
  };

  connectAccountId : any;

  constructor(
    private iab: InAppBrowser,
    public loadingController: LoadingController,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
  }

  async newAccount(){
    const loading = await this.loadingController.create({
      message: 'Opening...',
    });
    await loading.present();

    this.paymentService.connectAccount().subscribe((result) => {
      console.log(result);
      this.connectAccountId = result.accountID;
      this.openWithInAppBrowser(result.url);
      loading.dismiss();  
    });

    //this.openWithInAppBrowser('https://knockout.betaplanets.com/connectpaymentsuccess/');
  }

  openWithInAppBrowser(url : string){
    let target = "_blank";
    let browser = this.iab.create(url,target,this.options);
    
    browser.on('loadstop').subscribe(event=> {
      console.log("loadstop", event);
      //browser.close();
    });

    browser.on('exit').subscribe(event=> {
      console.log("exit", event);
      //browser.close();
    });    
  }
}
