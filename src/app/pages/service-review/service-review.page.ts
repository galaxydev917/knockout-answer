import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { UserService } from '../../services/user/user.service';
import {  LoadingController } from '@ionic/angular';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-service-review',
  templateUrl: './service-review.page.html',
  styleUrls: ['./service-review.page.scss'],
})
export class ServiceReviewPage implements OnInit {
  service_request : any;
  token: any;
  card_number: any;
  isSubmitting = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public loadingController: LoadingController,
    public storageService: StorageService,
    private location: Location,
    public menuCtrl: MenuController,

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service_request = this.router.getCurrentNavigation().extras.state.service_request;
        console.log(this.service_request);
      }
    });
    this.storageService.getObject(userinfo).then((result: any) => {
     this.token = result.token;
     this.card_number = result.card_number;
   }); 
  }

  submitRequest(){
    this.isSubmitting = true;
    console.log(this.service_request);
    this.service_request.token = this.token;
    this.userService.createRequest(this.service_request).subscribe((userprofileinfo) => {
      this.isSubmitting = false;
      this.presentAlert("Request sent successfully.");
    },
    (err) => {
      console.log(err);
      this.isSubmitting = false;
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
