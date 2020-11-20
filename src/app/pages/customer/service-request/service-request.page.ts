import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { RequestService } from '../../../services/request/request.service';

import { Location } from "@angular/common";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {
  pro_user : any;
  lgoined_userinfo : any = {};
  validationsform: FormGroup;
  isLoading = false;
  request_type = "";
  constructor(    
    private router: Router,
    private requestService: RequestService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private location: Location,
    public menuCtrl: MenuController,
    public loadingController: LoadingController,
    private route: ActivatedRoute,) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pro_user = this.router.getCurrentNavigation().extras.state.pro_user;
        this.lgoined_userinfo = this.router.getCurrentNavigation().extras.state.logined_userinfo;
        this.request_type = this.router.getCurrentNavigation().extras.state.request_type;
      }
    });
    this.validationsform = this.formBuilder.group({
      request_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      request: new FormControl('', Validators.compose([
        Validators.required
      ])),
      request_datetime: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }
  
  async ionViewWillEnter() {
  }

  async submitRequest(value){
    this.isLoading = true;
    value.to_user_id = this.pro_user.user_id;
    value.token = this.lgoined_userinfo.token;
    value.request_type = this.request_type;

    this.requestService.createService(value).subscribe((userinfo) => {
      this.isLoading = false;
      this.presentAlert("Sent service request successfully.");
    },
    (err) => {
      this.isLoading = false;
      this.presentAlert(err.error.msg);
    });
  }
  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 3000,
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
