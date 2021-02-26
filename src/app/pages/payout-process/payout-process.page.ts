import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';
import {  LoadingController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { PaymentService } from '../../services/payment/payment.service';
import { UserService } from '../../services/user/user.service';

const userinfo = config.USERINFO_STORAGE_KEY;
@Component({
  selector: 'app-payout-process',
  templateUrl: './payout-process.page.html',
  styleUrls: ['./payout-process.page.scss'],
})
export class PayoutProcessPage implements OnInit {
  validationsform: FormGroup;
  account_id : any;
  currentUser : any;
  creditCardNumber: string;
  stripe_key : any;
  expire_month :any;
  expire_year :any;
  balance : any;
  currentUserBalance = 0;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    public menuCtrl: MenuController,
    public loadingController: LoadingController,
    public storageService: StorageService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.validationsform = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  async ionViewWillEnter() {
    this.currentUser = await this.storageService.getObject(userinfo);
    this.currentUserBalance = this.currentUser.balance;
    this.route.params.subscribe(
      data => {
        this.account_id = data.account_id;

      }
    );
  }

  async getPaid(value) {

    if(value.amount < 100){
      this.presentAlert("Amount should be $100 at least.");
      return;
    }
    if(value.amount > this.currentUserBalance){
      this.presentAlert("Current balance insufficient.");
      return;
    }
    let param = {
      amount: value.amount * 100 * 0.9,
      accountId : this.account_id,
      currency : 'usd'
    };
    const loading = await this.loadingController.create({
      message: 'Processing...',
    });
    await loading.present();

    this.paymentService.withdraw(param).subscribe((result) => {

      if(result.id){
        this.balance = this.currentUser.balance - value.amount;
        let param = {
          balance: this.balance,
          token : this.currentUser.token
        };
        this.userService.updateBalance(param).subscribe((userprofileinfo) => {
          loading.dismiss();
          this.currentUserBalance = this.balance;
          this.currentUser.balance = this.balance;
          this.storageService.setObject(userinfo, this.currentUser);
          this.presentAlert("Payment Completed");
        },
        (err) => {
          console.log(err);
          this.presentAlert(err.error.msg);
        });  
      }else
        this.presentAlert("Payment Failed");
    },
    (err) => {
       this.presentAlert(err.error.msg);
       loading.dismiss();
    });
  }

  back(){
    this.location.back();
  }

  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 2000,
      message: value,
      mode: 'ios'
    });
    await loading.present();
  }
}
