import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, metaReducers } from "./reducers";
import { effects } from "./effects";
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StarRatingModule } from 'ionic5-star-rating';

const config: SocketIoConfig = { url: 'http://knockout.betaplanets.com:3001', options: {} };
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(), 
    StarRatingModule,
    FormsModule,  
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FileTransfer,
    FileChooser,
    WebView,
    FilePath,
    Stripe,
    VideoEditor,
    StreamingMedia,
    LocalNotifications,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
