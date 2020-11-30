import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  pro_userlist = [];
  searchName = '';
  isLoading = false;

  token: any;
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
      this.getProUsers();
    });  

  }

  getProUsers(){
    let param = {
      role: 'athlete',
      token: this.token,
      search_val: this.searchName

    };
    this.isLoading = true;
    this.userService.getUsers(param).subscribe((pro_userlist) => {
      this.pro_userlist = pro_userlist;
      this.isLoading = false;
    },
    (err) => {
       this.isLoading = false;
       this.presentAlert(err.error.code);
    });
  }
  searchInputChange(e){
    var search_value = e.detail.value;
    this.searchName = search_value;
    setTimeout(() => {
      if (search_value == this.searchName) {
        this.getProUsers();
      }
    }, 1000)
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
  selectService(value){
    let navigationExtras: NavigationExtras = {
      state: {
        pro_user: value
      }
    };    
    this.router.navigate(['/service-request'], navigationExtras);
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
