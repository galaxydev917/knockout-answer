import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { UserService } from '../../services/user/user.service';
import {  LoadingController } from '@ionic/angular';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { RequestService } from '../../services/request/request.service';

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
  isCompleted = false;
  current_userid : any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public loadingController: LoadingController,
    public storageService: StorageService,
    private location: Location,
    public menuCtrl: MenuController,
    public requestService: RequestService,
    private socket: Socket

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
     this.current_userid = result.user_id;
     this.card_number = result.card_number;
   }); 
   this.socket.connect();

  }

  submitRequest(){
    this.isSubmitting = true;
    this.service_request.token = this.token;
    this.service_request.from_user_id = this.current_userid;


    this.userService.createRequest(this.service_request).subscribe((userprofileinfo) => {
      this.isSubmitting = false;
      this.isCompleted = true;
      this.presentAlert("Request sent successfully.");
      this.socket.emit('send-service-request-notification', this.service_request);
    },
    (err) => {
      console.log(err);
      this.isSubmitting = false;
      this.presentAlert(err.error.msg);
    });  
  }
  async completeRequest(){
    const loading = await this.loadingController.create({
      message: 'Completing...',
    });
    await loading.present();
    this.service_request.token = this.token;
    this.requestService.completeRequest(this.service_request).subscribe((result) => {
      console.log(result);
      loading.dismiss();
      let navigationExtras: NavigationExtras = {
        state: {
          service_request: this.service_request
        }
      };    
      this.router.navigate(['/rating'], navigationExtras);
      // this.pro_userlist = pro_userlist;
      // this.isLoading = false;
    },
    (err) => {
      loading.dismiss();
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
