import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Location } from "@angular/common";
import { ActionSheetController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { config } from '../../config/config';

const baseUrl = config.Url + 'wp-content/uploads/videos';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPE = "video/mp4";

@Component({
  selector: 'app-pro-service-details',
  templateUrl: './pro-service-details.page.html',
  styleUrls: ['./pro-service-details.page.scss'],
})
export class ProServiceDetailsPage implements OnInit {
  service_request : any;
  selectedVideo: string; //= "https://res.cloudinary.com/demo/video/upload/w_640,h_640,c_pad/dog.mp4";
  uploadedVideo: string;

  isUploading: boolean = false;
  uploadPercent: number = 0;
  videoFileUpload: FileTransferObject;
  loader;
  constructor(
    public plt: Platform,
    private router: Router,
    private route: ActivatedRoute,
    public menuCtrl: MenuController,
    private location: Location,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private filePath: FilePath,
    private webview: WebView,
    private file: File,
    private ref: ChangeDetectorRef,
    private transfer: FileTransfer,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service_request = this.router.getCurrentNavigation().extras.state.service_request;
      }
    });
  }
  cancelSelection() {
    this.selectedVideo = null;
    this.uploadedVideo = null;
  }

  selectVideo() {
    // const options: CameraOptions = {
    //   mediaType: this.camera.MediaType.VIDEO,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // }
    var options: CameraOptions = {
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
  };
alert("select Video");
    this.camera.getPicture(options).then( async (videoUrl) => {
        alert(videoUrl);

        // if (videoUrl) {
        //   this.uploadedVideo = null;
          
        //   var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
        //   var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

        //   dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
        //   try {
        //     var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
        //     var retrievedFile = await this.file.getFile(dirUrl, filename, {});

        //   } catch(err) {
        //     return this.presentAlert("Error Something went wrong.");
        //   }
          
        //   retrievedFile.file( data => {
        //       if (data.size > MAX_FILE_SIZE) return this.presentAlert("Error You cannot upload more than 5mb.");
        //       if (data.type !== ALLOWED_MIME_TYPE) return this.presentAlert("Error Incorrect file type.");

        //       this.selectedVideo = retrievedFile.nativeURL;
        //       console.log("12121212121", this.selectedVideo)
        //       this.uploadVideo();
        //   });
        // }
      },
      (err) => {
        console.log(err);
      });
  }

  uploadVideo() {
    var url = baseUrl;
    
    var filename = this.selectedVideo.substr(this.selectedVideo.lastIndexOf('/') + 1);
      
    var options: FileUploadOptions = {
      fileName: filename,
      fileKey: "video",
      mimeType: "video/mp4"
    }

    this.videoFileUpload = this.transfer.create();

    this.isUploading = true;

    this.videoFileUpload.upload(this.selectedVideo, url, options)
      .then((data)=>{
        this.isUploading = false;
        this.uploadPercent = 0;
        return JSON.parse(data.response);
      })
      .then((data) => {        
        this.uploadedVideo = data.url;
        this.presentAlert("Success: Video upload was successful.");
      })
      .catch((err)=>{
        this.isUploading = false;
        this.uploadPercent = 0;
        this.presentAlert("Error: Error uploading video.");
      });

    this.videoFileUpload.onProgress((data) => {
      this.uploadPercent = Math.round((data.loaded/data.total) * 100);
    });

  }

  cancelUpload() {
    this.videoFileUpload.abort();
    this.uploadPercent = 0;
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
  back(){
    this.location.back();
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
