import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { config } from './config/config';

const userstorage_key = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/tablinks/home'
    },
    {
      title: 'Service Request',
      url: '/tablinks/services'
    },
    {
      title: 'Messages',
      url: '/tablinks/messages'
    },
    {
      title: 'Contact US',
      url: '/tablinks/messages'
    },    
    {
      title: 'Privacy Policy',
      url: '/tablinks/messages'
    },    
    {
      title: 'Terms & Conditions',
      url: '/tablinks/messages'
    },    
    {
      title: 'Logout',
      url: '/tablinks/messages'
    }                 
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private router: Router,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logout(){
    this.storage.remove(userstorage_key);
    this.router.navigate(['/signin']);
  }
}
