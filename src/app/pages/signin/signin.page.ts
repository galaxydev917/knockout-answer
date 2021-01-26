import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage.service';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
 import { config } from '../../config/config';

const userstorage_key = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  rowHeight : any;
  rowHeight1 : any;
  validationsform: FormGroup;
  isLoading = false;

  constructor(
    public formBuilder: FormBuilder,
    public storageService: StorageService,
    public userService: UserService,
    public loadingController: LoadingController,
    public router: Router,
    public plt: Platform
    ) { }

  ngOnInit() {
    this.rowHeight = this.plt.height() / 2 + 'px';
    this.rowHeight1 = this.plt.height() / 2 -100 + 'px';
    this.validationsform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
    this.validationsform.setValue({
      email: 'testercelebrity@gmail.com',
      password: 'Celebrity2020#'
   });
//  this.validationsform.setValue({
//     email: 'jin@gmail.com',
//     password: '123456'
//  });
  }
  
  async trySignin(value){
    this.isLoading = true;
    this.userService.doLogin(value).subscribe((userinfo) => {
      this.isLoading = false;
      this.storageService.setObject(userstorage_key,userinfo);
      
      if(userinfo.role == "athlete")
        this.router.navigate(['/pro-tablinks/pro-home']);
      if(userinfo.role == "customer")
        this.router.navigate(['/tablinks/home']);        
    },
    (err) => {
      console.log(err);
      this.isLoading = false;
      //this.presentAlert(err.error.code);
      this.presentAlert("Invalid login info.");
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
}
