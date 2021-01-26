import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AnswerService } from '../../services/answer/answer.service';
import { config } from '../../config/config';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { MenuController, LoadingController } from '@ionic/angular';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-pro-home',
  templateUrl: './pro-home.page.html',
  styleUrls: ['./pro-home.page.scss'],
})
export class ProHomePage implements OnInit {
  token: any;
  videolist = [];
  isLoading = false;

  constructor(
    public answerService: AnswerService,
    public storageService: StorageService,
    public menuCtrl: MenuController,
    public streamingMedia: StreamingMedia,
    public loadingController: LoadingController,
    public socialSharing: SocialSharing
  ) { }

  ngOnInit() {

  }
  
  ionViewWillEnter(){
    this.storageService.getObject(userinfo).then((result: any) => {
      this.token = result.token;
      this.isLoading = true;
      this.getVideoList();
    });  
  }
  async getVideoList(){
    let param = {
      role: 'athlete',
      token: this.token
    };
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
    this.answerService.getVideoList(param).subscribe( videos => {
      this.videolist = videos;
      loading.dismiss();
      this.isLoading = false;
      
    },
    (err) => {
      this.isLoading = false;
      loading.dismiss();
    });
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }

  playVideo(val) {
    let options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played'); },
    errorCallback: (e) => { console.log('Error streaming') },
    orientation: 'portrait'
    };
    this.streamingMedia.playVideo(val.attached_videoid, options);
  }
  // shareviaWhatsapp(){
  //   this.socialSharing.shareViaWhatsApp(this.message,this.imageForSharing,null).then((success) =>{
  //     alert("Success");
  //   })
  //   .catch(()=>{
  //     alert("Could not share information");
  //   });
  // }

  shareviaFacebook(val){
    this.socialSharing.shareViaFacebook(val.request, val.attached_videoid,null).then((success) =>{
      console.log("shared successfully.");
    })
    .catch((err)=>{
      console.log("Could not share information");
    });
  }
  // shareviaInstagram(){
  //   this.socialSharing.shareViaInstagram(this.message,this.imageForSharing)
  //   .then((success) =>{
  //       alert("Success");
  //     })
  //     .catch(()=>{
  //       alert("Could not share information");
  //     });
  // }
  // shareviaTwitter(){
  //   this.socialSharing.shareViaTwitter(this.message,this.imageForSharing,null)
  //   .then((success) =>{
  //       alert("Success");
  //     })
  //     .catch((err)=>{
  //       alert("Could not share information");
  //     });
  // }  
}
