import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { UserService } from '../../services/user/user.service';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from "@angular/common";

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.page.html',
  styleUrls: ['./service-history.page.scss'],
})
export class ServiceHistoryPage implements OnInit {
  token: any;
  requestList = [];
  isLoading = false;
  status = "pending";
  constructor(
    public userService: UserService,
    public loadingController: LoadingController,
    public storageService: StorageService,
    private router: Router,
    public menuCtrl: MenuController,
    private location: Location,


  ) { }

  ngOnInit() {
    this.storageService.getObject(userinfo).then((result: any) => {
       this.token = result.token;
       this.getServiceRequests();
    });  
  }

  getServiceRequests(){
    let param = {
      token: this.token,
      status: this.status
    };
    
    this.isLoading = true;
    this.userService.getServiceRequests(param).subscribe((result) => {
      this.requestList = result.request_list;
      console.log(this.requestList);
       this.isLoading = false;
    },
    (err) => {
       this.isLoading = false;
       this.presentAlert(err.error.msg);
    });
  }
  segmentChanged(event){
    this.status = event.detail.value;
    this.requestList = [];
    this.getServiceRequests();
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

  selectService(selectedService){
    let navigationExtras: NavigationExtras = {
      state: {
        service_request: selectedService
      }
    };    
    this.router.navigate(['/service-details'], navigationExtras);
  }
  back(){
    // this.location.back();
    this.router.navigate(['/tablinks/profile']);
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
