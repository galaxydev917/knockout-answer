import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, ToastController, Platform, LoadingController  } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Storage } from '@ionic/storage';
import { UserService } from '../../../services/user/user.service';
import { config } from '../../../config/config';


const profile_photo = config.PROFILE_PHOTO_STORAGE_KEY;
const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-pro-profile',
  templateUrl: './pro-profile.page.html',
  styleUrls: ['./pro-profile.page.scss'],
})
export class ProProfilePage implements OnInit {
  rowHeight : any;
  images = [];
  fullName = "";
  constructor(
    public plt: Platform,
    private userService: UserService,
    private camera: Camera,
    private filePath: FilePath,
    private actionSheetController: ActionSheetController,
    private storage: Storage,
    private webview: WebView,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private file: File,
  ) { }

  ngOnInit() {
    this.rowHeight = this.plt.height() / 3 + 'px';
    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
    this.getStorageUserInfo();
  }
  getStorageUserInfo(){
    this.storage.get(userinfo).then(userInfo=>{
      console.log(userInfo.first_name);
      this.fullName = userInfo.first_name + " " + userInfo.last_name;
    });
  }  
  loadStoredImages() {
    this.storage.get(profile_photo).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
}
 
takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
 
    this.camera.getPicture(options).then(imagePath => {
        if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
    });
 
  }
  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
 }
 
 copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.updateStoredImages(newFileName);
    }, error => {
        //this.presentToast('Error while storing file.');
    });
  }
  updateStoredImages(name) {
    this.storage.get(profile_photo).then(images => {
        let newImages = [name];
        this.storage.set(profile_photo, JSON.stringify(newImages));
        let filePath = this.file.dataDirectory + name;
        let resPath = this.pathForImage(filePath);
        let newEntry = {
            name: name,
            path: resPath,
            filePath: filePath
        };
 
        this.images = [newEntry, ...this.images];
        this.ref.detectChanges(); // trigger change detection cycle
    });
  }
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
  deleteImage() {
    //this.images.splice(position, 1);
 
    this.storage.get(profile_photo).then(images => {
        let arr = JSON.parse(images);
        let filtered = arr.filter(name => name != this.images[0].name);
        this.storage.set(profile_photo, JSON.stringify(filtered));
 
        var correctPath = this.images[0].name.filePath.substr(0, this.images[0].name.filePath.lastIndexOf('/') + 1);
 
        this.file.removeFile(correctPath, this.images[0].name.name).then(res => {
            this.presentToast('File removed.');
        });
    });
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }
}
