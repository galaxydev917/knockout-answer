import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';
import {  LoadingController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { PaymentService } from '../../services/payment/payment.service';
import { Stripe } from '@ionic-native/stripe/ngx';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    public menuCtrl: MenuController,
    public loadingController: LoadingController,
    public storageService: StorageService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private stripe: Stripe
  ) { }

  ngOnInit() {

    this.validationsform = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required
      ])),      
      card_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(19)
      ])),
      expiration_date: new FormControl('', Validators.compose([
        Validators.required
      ])),
      cvv: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ]))  
    });
  }

  async ionViewWillEnter() {
    this.currentUser = await this.storageService.getObject(userinfo);
    this.route.params.subscribe(
      data => {
        this.account_id = data.account_id;

      }
    );
  }

  isValidDate(dateString)
  {
      // First check for the pattern
      if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
          return false;
  
      // Parse the date parts to integers
      var parts = dateString.split("/");
      var day = parseInt(parts[1], 10);
      var month = parseInt(parts[0], 10);
      var year = parseInt(parts[2], 10);
      this.expire_month = month;
      this.expire_year = year;

      // Check the ranges of month and year
      if(year < 1000 || year > 3000 || month == 0 || month > 12)
          return false;
  
      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  
      // Adjust for leap years
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          monthLength[1] = 29;
  
      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
  }

  cc_format(value: string) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) {
      this.creditCardNumber = parts.join(' ');
    } else {
      this.creditCardNumber = value;
    }
  }

  async getPaid(value) {

    if(!this.isValidDate(value.expiration_date)){
      this.presentAlert("Invalid date format. ex: 01/29/2021");
      return;
    }  
    if(!this.stripe.validateExpiryDate(this.expire_month, this.expire_year)){
      this.presentAlert("Invalid Expiration date.");
      return;
    }
    if(!this.stripe.validateCVC(value.cvv)){
      this.presentAlert("Invalid Cvc number.");
      return;
    }
    if(!this.stripe.validateCardNumber(value.card_number)){
      this.presentAlert("Invalid Card number.");
      return;
    }    
    let param = {
      amount: value.amount * 100,
      account_id : this.account_id,
      currency : 'usd'
    };
    const loading = await this.loadingController.create({
      message: 'Processing...',
    });
    await loading.present();

    this.paymentService.creatPaymentIntent(param).subscribe((result) => {
      this.presentAlert("Payment Completed");

      loading.dismiss();
      //this.pay(result, value.card_number);
    },
    (err) => {
       this.presentAlert(err.error.msg);
       loading.dismiss();
    });
  }

  // pay(paymentIntent, card){
    
  //   this.stripe.

  //   stripe
  //   .confirmCardPayment(paymentIntent.clientSecret, {
  //     payment_method: {
  //       card: card
  //     }
  //   })
  //   .then(function(result) {
  //     console.log(result);
  //   });
  // }

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
