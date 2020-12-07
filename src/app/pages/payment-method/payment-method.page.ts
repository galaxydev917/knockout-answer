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
  service_request : any;
  stripe_key = 'pk_test_hFWXh3onj1c0sdhsGPc9U2BU00GwFnBYeb';

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
        this.service_request = this.router.getCurrentNavigation().extras.state.service_request;
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

  creatCardToken(value) {
    if(!this.isValidDate(value.expiration_date)){
      this.presentAlert("Invalid date format.");
      return;
    }  
    this.stripe.setPublishableKey(this.stripe_key);
    var number = value.card_number.split(" ").join("");
    var expMonth = value.expiration_date.split('/')[0];
    var expYear = value.expiration_date.split('/')[2];
    var cvc = value.cvv;
    var card_lastnumber = value.card_number.substr(value.card_number.lastIndexOf(" ")+1);
    this.cardDetails = {
      number: number,
      expMonth: expMonth,
      expYear: expYear,
      cvc: cvc
    }
    this.isUpdating = true;
    this.stripe.createCardToken(this.cardDetails)
      .then(result => {
        let param = {
          card_token: result.id,
          card_number: card_lastnumber,
          token: this.token
        };

        this.userService.updateProfile(param).subscribe((userprofileinfo) => {
          this.isUpdating = false;
          this.storageService.setObject(userinfo, userprofileinfo.profile);

          //this.presentAlert("Updated Successfully.");
          let navigationExtras: NavigationExtras = {
            state: {
              service_request: this.service_request
            }
          };           
          this.router.navigate(['/service-review'], navigationExtras); 
        },
        (err) => {
          this.isUpdating = false;
          this.presentAlert(err.error.msg);
        });      
      }).catch(error => {
        console.error(error)
        this.presentAlert(error.message);
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
