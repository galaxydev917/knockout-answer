import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController, Platform, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public loadingController: LoadingController,) { }

  ngOnInit() {
    
    //this.presentAlert("aaaaaa");
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
