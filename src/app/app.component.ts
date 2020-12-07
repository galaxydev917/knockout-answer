import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { config } from './config/config';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Socket } from 'ngx-socket-io';
import { StorageService } from './services/storage.service';

const userstorage_key = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  clickNotificationSub: any;
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
    private statusBar: StatusBar,
    private localNotifications: LocalNotifications,
    private socket: Socket,
    public storageService: StorageService,

    
  ) {
    this.initializeApp();
    this.socket.connect();
    
    this.sendServiceRequestNotification();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.clickNotificationSub = this.localNotifications.on('click').subscribe(data => {
      //   this.router.navigate(['/pro-tablinks/pro-services']);
      //   //this.unsub();
      // });
    });
  }

  sendServiceRequestNotification(){
    this.socket.fromEvent('service_request_notification').subscribe(service_request => {
      var receive_user_id = service_request['to_user_id'];
      this.storageService.getObject(userstorage_key).then((result: any) => {
        var current_user_id = result.user_id;
        alert(current_user_id);
        alert(receive_user_id);
        if(current_user_id == receive_user_id){
          this.openRequestNotification();
        }
      }); 
   });

  }
  
  openRequestNotification() {
    this.localNotifications.schedule({
      id: Date.now(),
      text: 'You have new service request.',
      data: { secret: 'service_request' }
    });
  }

  unsub() {
    this.clickNotificationSub.unsubscribe();
  }

  logout(){
    this.storage.remove(userstorage_key);
    this.router.navigate(['/signin']);
  }
}
//ionic cordova run ios --target="A89C1114-5C2D-40ED-A0A1-7C70CDD399E3" --livereload