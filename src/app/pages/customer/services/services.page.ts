import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { config } from '../../../config/config';
import { Router, NavigationExtras } from '@angular/router';

import { UserService } from '../../../services/user/user.service';
import { MenuController } from '@ionic/angular';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  isLoading = false;
  selectService = "text";
  token : any;
  users : any = [];
  lgoined_userinfo : any = {};
  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getProUsers();
  }

  getProUsers(){
    this.isLoading = true;
    this.storage.get(userinfo).then(userInfo=>{
      this.lgoined_userinfo = userInfo;
      this.token = userInfo.token;
      let param = {
        token : userInfo.token,
        role : 'athlete'
      };
      this.userService.getProUsers(param).subscribe((users) => {
        this.users = users;
        this.isLoading = false;
 
      },
      (err) => {
        this.isLoading = false;
      });
    });
  }  
  gotoServiceRequest(user){
    console.log(this.selectService);
    let navigationExtras: NavigationExtras = {
      state: {
        pro_user: user,
        logined_userinfo: this.lgoined_userinfo,
        request_type: this.selectService
      }
    };    
    this.router.navigate(['/service-request'], navigationExtras);
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
