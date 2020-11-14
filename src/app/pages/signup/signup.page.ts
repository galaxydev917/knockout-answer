import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  rowHeight : any;
  validationsform: FormGroup;
  isLoading = false;
  constructor(
    public plt: Platform,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private router: Router,
    public httpClient: HttpClient
    ) { }

  ngOnInit() {
    this.rowHeight = (this.plt.height()) - 100 + 'px';

    this.validationsform = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phonenumber: new FormControl('', Validators.compose([
        Validators.required
      ])),     
      zipcode: new FormControl('', Validators.compose([
        Validators.required
      ])),  
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
  tryRegister(value) {

    this.isLoading = true;
      this.userService.createUser(value).subscribe( resp => {
        this.isLoading = false;

        //this.storage.set('userinfo', resp[0]);
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
