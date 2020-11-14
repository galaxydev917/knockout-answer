import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.page.html',
  styleUrls: ['./forgotpwd.page.scss'],
})
export class ForgotpwdPage implements OnInit {
  validationsform: FormGroup;
  isLoading = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public loadingController: LoadingController,
    public plt: Platform
  ) { }

  ngOnInit() {

    this.validationsform = this.formBuilder.group({
      user_login: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }
  async tryResetPwd(value){
    this.isLoading = true;
    this.userService.resetPassword(value).subscribe((userinfo) => {
      this.isLoading = false;
      this.presentAlert("Sent reset password link to the email.");
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
}
