import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { config } from '../../../config/config';

import { UserService } from '../../../services/user/user.service';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  isLoading = false;
  token : any;
  users : any = [];
  constructor(
    private storage: Storage,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getProUsers();
  }

  getProUsers(){
    this.isLoading = true;
    this.storage.get(userinfo).then(userInfo=>{
      let param = {
        token : userInfo.token,
        role : 'athlete'
      };
      this.userService.getProUsers(param).subscribe((users) => {
        this.users = users;
        this.isLoading = false;
        // this.isUpdating = false;
        // this.storage.set(userinfo, userprofileinfo);
        //this.presentAlert("Updated Successfully.");
  
      },
      (err) => {
        // this.isUpdating = false;
        // this.presentAlert(err.error.msg);
      });
    });


  }  

}
