import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

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
    private formBuilder: FormBuilder,
    private storage: Storage,
    private userService: UserService,
    public loadingController: LoadingController,
    private router: Router,
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
  }

  async trySignin(value){
    this.isLoading = true;
    this.userService.doLogin(value).subscribe((userinfo) => {
      this.isLoading = false;
      this.storage.set('userinfo',userinfo);
      this.router.navigate(['/home']);
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
