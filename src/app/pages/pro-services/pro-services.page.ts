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

  }
  ionViewWillEnter(){
    this.storageService.getObject(userinfo).then((result: any) => {
      this.token = result.token;
      this.isLoading = true;

      this.getServiceRequests();
   });  
  }  
  async getServiceRequests(){
    let param = {
      token: this.token,
      status: this.status
    };
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();

    this.userService.getServiceRequests(param).subscribe((result) => {
      this.requestList = result.request_list;
       this.isLoading = false;
       for(var i=0; i<this.requestList.length; i++){
        this.requestList[i].created = this.requestList[i].created.split(' ')[0];
      }
      loading.dismiss();
    },
    (err) => {
       this.isLoading = false;
       loading.dismiss();
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
