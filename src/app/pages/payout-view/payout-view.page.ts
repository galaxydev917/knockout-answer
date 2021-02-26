import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { PaymentService } from '../../services/payment/payment.service';
import {  LoadingController } from '@ionic/angular';
import { config } from '../../config/config';
import { StorageService } from '../../services/storage.service';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

const userinfo = config.USERINFO_STORAGE_KEY;

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
    hidenavigationbuttons : 'yes',
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'fullscreen',//iOS only 
    fullscreen : 'yes',//Windows only    
  };

  connectAccountId : any;
  currentUser : any;
  account_list = [];
  isLoading = false;
  constructor(
    private iab: InAppBrowser,
    public loadingController: LoadingController,
    private location: Location,
    private storageService: StorageService,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {

  }

  async ionViewWillEnter(){
    this.currentUser = await this.storageService.getObject(userinfo);
    this.getConnectAcounts();
  }

  async getConnectAcounts(){
    const loading = await this.loadingController.create({
      message: 'Loading accounts...',
    });
    await loading.present();

    this.isLoading = true;

    this.paymentService.getConnectAcounts(this.currentUser.token).subscribe((result) => {
      this.isLoading = false;
      loading.dismiss();
      this.account_list = result.account_list;
    },(err) => {
      this.isLoading = false;
      loading.dismiss();
    });
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
  }


  openWithInAppBrowser(url : string){
    let target = "_blank";
    let browser = this.iab.create(url,target,this.options);
    
    browser.on('loadstop').subscribe(async (event)=> {

      if(event.url == 'https://knockout.betaplanets.com/connectpaymentsuccess/'){
        console.log();
        this.paymentService.getAccountInfo(this.connectAccountId).subscribe((result) => {
          console.log(result.email);

          let param = {
            token: this.currentUser.token,
            email: result.email,
            accountId: this.connectAccountId
          };

          this.paymentService.creatNewAccount(param).subscribe(async(result) => {
            console.log("loadstop", result);
        
            this.paymentService.getConnectAcounts(this.currentUser.token).subscribe((result) => {
              this.isLoading = false;
              this.account_list = result.account_list;
              browser.close();
            },(err) => {
            });

            
          },
          (err) => {
            console.log("err====", err);
          });  
        },
        (err) => {
          console.log("getAccountInfo err====", err);
        });  
      }
    });

    browser.on('exit').subscribe(event=> {
      console.log("exit", event);
    });    
  }
  back(){
    this.router.navigate(['/pro-tablinks/pro-profile']);
  }
}
