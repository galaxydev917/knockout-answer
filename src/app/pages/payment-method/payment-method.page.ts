import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {  LoadingController } from '@ionic/angular';
import { Stripe } from '@ionic-native/stripe/ngx';
import { UserService } from '../../services/user/user.service';
import { config } from '../../config/config';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  validationsform: FormGroup;
  creditCardNumber: string;
  token : any;
  isUpdating = false;
  cardDetails: any = {};
  pro_user : any;
  stripe_key = 'pk_test_51HtrvsKY2u65BLBeU25OUqgTyqh4rzj4L1lZ2UmBqaS3mrWh9SYzG7rdimDienDlCOX0C1WklkeTuHPJlk8l53kK00TxWuI6KQ';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public loadingController: LoadingController,
    private stripe: Stripe, 
    private userService: UserService,
    private location: Location,
    public storageService: StorageService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pro_user = this.router.getCurrentNavigation().extras.state.pro_user;
      }
    });

    this.validationsform = this.formBuilder.group({
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
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required
      ]))        
    });

    this.storageService.getObject(userinfo).then((result: any) => {
      this.token = result.token;
    });  
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

  async addPaymentMethod(value) {

    let param = {
      card_number: value.card_number,
      card_cvc : value.cvv,
      card_expiration_date : value.expiration_date,
      token: this.token
    };
    const loading = await this.loadingController.create({
      message: 'Updating payment method...',
    });
    await loading.present();

    this.userService.updateProfile(param).subscribe(async (userprofileinfo) => {
      await this.storageService.setObject(userinfo, userprofileinfo.profile);
      //this.presentAlert("Updated Successfully.");
      let navigationExtras: NavigationExtras = {
        state: {
          pro_user: this.pro_user
        }
      };    
      loading.dismiss();
      this.router.navigate(['/service-request'], navigationExtras); 
    },
    (err) => {
      this.isUpdating = false;
      this.presentAlert(err.error.msg);
    });      

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

  back(){
    this.location.back();
  }

  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
