import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {
  pro_user : any;
  service_request : any;
  validationsform: FormGroup;
  primedate : any;
  isLivePost = false;
  token: any;
  card_number: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    public menuCtrl: MenuController,
    private route: ActivatedRoute,
    public storageService: StorageService

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pro_user = this.router.getCurrentNavigation().extras.state.pro_user;
      }
    });
    this.validationsform = this.formBuilder.group({
      question: new FormControl('', Validators.compose([
        Validators.required
      ])),      
      primedate: new FormControl('', Validators.compose([
        Validators.required
      ])),
      primetime: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.primedate = new Date().toISOString(); 
    this.validationsform.setValue({
      primedate: this.primedate,
      primetime: this.primedate,
      question: ''
    });
  }

  ionViewWillEnter(){
    this.storageService.getObject(userinfo).then((result: any) => {
      console.log(result);
      this.token = result.token;
      this.card_number = result.card_number;
    }); 
  }
  
  next(value){

    this.service_request = this.pro_user;
    this.service_request.request_type = this.isLivePost ? 'livepost' : 'nolivepost';
    this.service_request.isLivePost = this.isLivePost;
    this.service_request.request = value.question;
    this.service_request.primedate = this.primedate;
    this.service_request.to_user_id = this.service_request.user_id;
    if(this.isLivePost)
      this.service_request.service_price = this.service_request.service_price * 1.5;

    let navigationExtras: NavigationExtras = {
      state: {
        service_request: this.service_request
      }
    }; 

    if(this.card_number != undefined && this.card_number != '')
      this.router.navigate(['/service-review'], navigationExtras);  
    else
      this.router.navigate(['/payment-method'], navigationExtras);      
  }  
  onCheckLivePostChange(e){
    this.isLivePost = e.detail.checked;
  }
  back(){
    this.location.back();
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
