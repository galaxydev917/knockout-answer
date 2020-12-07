import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';
const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-pro-services',
  templateUrl: './pro-services.page.html',
  styleUrls: ['./pro-services.page.scss'],
})
export class ProServicesPage implements OnInit {
  token: any;
  status = "pending";
  isLoading = false;
  requestList = [];

  constructor(
    public userService: UserService,
    private router: Router,
    public loadingController: LoadingController,
    public storageService: StorageService,
    public menuCtrl: MenuController,
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
  selectService(selectedService){
    let navigationExtras: NavigationExtras = {
      state: {
        service_request: selectedService
      }
    };    
    this.router.navigate(['/pro-service-details'], navigationExtras);
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
  segmentChanged(event){
    this.status = event.detail.value;
    this.requestList = [];
    this.getServiceRequests();
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
