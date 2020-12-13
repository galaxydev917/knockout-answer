import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Location } from "@angular/common";
import { LoadingController, Platform } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { config } from '../../config/config';
import { VideoEditor,CreateThumbnailOptions } from '@ionic-native/video-editor/ngx';
import { StorageService } from '../../services/storage.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

const baseUrl = config.api_baseUrl + '/give_answer_to_request';
const videoThumb_baseUrl = config.api_baseUrl + '/upload_request_thumb';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPE = "video/mp4";
const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-pro-service-details',
  templateUrl: './pro-service-details.page.html',
  styleUrls: ['./pro-service-details.page.scss'],
})
export class ProServiceDetailsPage implements OnInit {
  service_request : any;
  selectedVideo: string; //= "https://res.cloudinary.com/demo/video/upload/w_640,h_640,c_pad/dog.mp4";
  uploadedVideo: string;
  seletedVideoThumb: string;
  videoThumb_nativepath: string;
  isUploading: boolean = false;
  isLoadingVideo: boolean = false;
  isShowAnswerBtn: boolean = true;
  uploadPercent: number = 0;
  videoFileUpload: FileTransferObject;
  videoThumbFileUpload: FileTransferObject;
  loader;
  token: any;
  constructor(
    public plt: Platform,
    private router: Router,
    private route: ActivatedRoute,
    public menuCtrl: MenuController,
    private location: Location,
    private videoEditor: VideoEditor,
    private camera: Camera,
    private webview: WebView,
    private file: File,
    public streamingMedia: StreamingMedia, 
    public storageService: StorageService,
    private transfer: FileTransfer,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service_request = this.router.getCurrentNavigation().extras.state.service_request;
      }
    });
    this.storageService.getObject(userinfo).then((result: any) => {
      this.token = result.token;
   });  
  }
  cancelSelection() {
    this.selectedVideo = null;
    this.uploadedVideo = null;
    this.isShowAnswerBtn = true;
  }

  selectVideo() {
    const options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then( async (videoUrl) => {

        if (videoUrl) {
          this.uploadedVideo = null;
          
          var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
          var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
          try {
            var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
            var retrievedFile = await this.file.getFile(dirUrl, filename, {});

          } catch(err) {
            return this.presentAlert("Error Something went wrong.");
          }
          this.isLoadingVideo = true;
          retrievedFile.file( data => {
              if (data.size > MAX_FILE_SIZE) return this.presentAlert("Error You cannot upload more than 5mb.");
              //if (data.type !== ALLOWED_MIME_TYPE) return this.presentAlert("Error Incorrect file type.");
              this.selectedVideo = retrievedFile.nativeURL;

                //Creating thumbnail
                var option:CreateThumbnailOptions = {fileUri: this.selectedVideo, width:200, height:150, atTime:1, outputFileName: 'video_thumbnail', quality:50 };
                this.videoEditor.createThumbnail(option).then(result=>{
                    //result-path of thumbnail
                    console.log("thumnail image======", result);
                    this.isLoadingVideo = false;
                    this.isShowAnswerBtn = false;
                    this.videoThumb_nativepath = result;
                    this.seletedVideoThumb = this.pathForImage(result) ;
                }).catch(e=>{
                  console.log("thumnail error", e);
                });
            //this.uploadVideo();
          });
        }
      },
      (err) => {
        console.log(err);
      });
  }

  uploadVideo() {
    var url = baseUrl;
    var filename = this.selectedVideo.substr(this.selectedVideo.lastIndexOf('/') + 1);

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: filename,
      headers: {},
      mimeType: "multipart/form-data",
      params: {request_id : this.service_request.id, token: this.token},
      chunkedMode: false
    }
    this.videoFileUpload = this.transfer.create();

    this.isUploading = true;

    this.videoFileUpload.upload(this.selectedVideo, url, options)
      .then((data)=>{
        console.log("result video uploaded", data.response);
        this.uploadVideoThumnail(data.response);
        //this.presentAlert("Success: Video upload was successful.");
      })
      .catch((err)=>{
        console.log("errororororo", err);
        this.isUploading = false;

        this.presentAlert("Error uploading video.");
      });

  }

  uploadVideoThumnail(request_answer_id){
    var answer_id = request_answer_id; 
    console.log("param===", answer_id);
    var url = videoThumb_baseUrl;
    var filename = this.videoThumb_nativepath.substr(this.videoThumb_nativepath.lastIndexOf('/') + 1);

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: filename,
      headers: {},
      mimeType: "multipart/form-data",
      params: {request_answer_id: answer_id, token: this.token },
      chunkedMode: false
    }
    this.videoThumbFileUpload = this.transfer.create();

    this.videoThumbFileUpload.upload(this.videoThumb_nativepath, url, options)
      .then((data)=>{
        console.log("result thumbnail uploaded data", data);
        console.log("attachment_thumb_id", data['attachment_thumb_id']);

        this.isUploading = false;
        this.uploadPercent = 0;
        this.presentAlert("Posted answer successfully.");
      })
      .catch((err)=>{
        console.log("errororororo", err);
        this.isUploading = false;
        this.uploadPercent = 0;
        this.presentAlert("Error uploading video.");
      });

      this.videoThumbFileUpload.onProgress((data) => {
        this.uploadPercent = Math.round((data.loaded/data.total) * 100);
      });
  }
  playVideo() {
    let options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played'); },
    errorCallback: (e) => { console.log('Error streaming') },
    orientation: 'portrait'
    };
    this.streamingMedia.playVideo(this.selectedVideo, options);
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
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
  back(){
    this.location.back();
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
