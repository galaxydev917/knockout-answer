import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {
  pro_user : any;
  validationsform: FormGroup;
  primedate : any;
  isLivePost = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    public menuCtrl: MenuController,
    private route: ActivatedRoute,

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

  next(value){
    value.isLivePost = this.isLivePost;
    console.log(value)

    let navigationExtras: NavigationExtras = {
      state: {
        service_request: value
      }
    };    
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
