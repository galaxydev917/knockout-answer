import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { CategoryService } from '../../services/category/category.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  rowHeight : any;
  validationsform: FormGroup;
  pro_validationsform: FormGroup;
  signupOption = 'customer';
  isLoading = false;
  categorylist = [];
  constructor(
    public plt: Platform,
    private categoryService: CategoryService,
    private userService: UserService,    
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public httpClient: HttpClient
    ) { }

  ngOnInit() {
    this.rowHeight = (this.plt.height()) - 100 + 'px';
    this.getCategoryList();

    this.pro_validationsform = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
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
      phonenumber: new FormControl('', Validators.compose([
        Validators.required
      ])),     
      category: new FormControl('', Validators.compose([
        Validators.required
      ])),        
      service_price: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });

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
    value.role = this.signupOption;
    this.isLoading = true;
      this.userService.createUser(value).subscribe( resp => {
        this.isLoading = false;
       // this.storage.set('userinfo', resp);
        this.presentAlert("Registered successfully.");
      },
      (err) => {
        this.isLoading = false;
        this.presentAlert(err.error.msg);
      });
  }
  getCategoryList(){
    this.categoryService.getCategoryList().subscribe( categories => {
      console.log(categories);
      this.categorylist = categories;
    },
    (err) => {
    });
  }

  tryRegisterPro(value) {
    value.role = this.signupOption;
    this.isLoading = true;
      this.userService.createUser(value).subscribe( resp => {
        this.isLoading = false;
        this.presentAlert("Registered successfully.");
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
  segmentChanged(event){
    this.signupOption = event.detail.value;
  }
}
