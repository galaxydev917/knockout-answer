import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, ToastController, Platform, LoadingController  } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { UserService } from '../../services/user/user.service';
import { config } from '../../config/config';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Location } from "@angular/common";

const profile_photo = config.PROFILE_PHOTO_STORAGE_KEY;
const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  rowHeight : any;
  images = [];
  userProfilePicture : any;
  fullName = "";
  validationsform: FormGroup;
  isUpdating = false;
  logined_userInfo : any;
  profile_photoInfo : any;
  token : any;
  loginUserInfo : any;
  constructor(
    public plt: Platform,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private userService: UserService,
    private camera: Camera,
    private filePath: FilePath,
    private actionSheetController: ActionSheetController,
    public storageService: StorageService,
    public loadingController: LoadingController,
    private webview: WebView,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private file: File,
    private location: Location,
  ) { }
  ngOnInit() {
    this.rowHeight = this.plt.height() / 3 + 'px';

    this.validationsform = this.formBuilder.group({
      contact_email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
    // this.plt.ready().then(() => {
    //   this.loadStoredImages();
    // });
    this.storageService.getObject(userinfo).then((result: any) => {

      this.validationsform.setValue({
        contact_email: result.user_email,
        phone: result.phone,
     });

      this.loginUserInfo = result;
      this.fullName = result.first_name + " " + result.last_name;
      this.token = result.token;
      this.userProfilePicture = result.profile_picture;
      if(this.userProfilePicture != undefined){
        let name = this.userProfilePicture.substr(this.userProfilePicture.lastIndexOf("/")+1);
        let filePath = this.file.dataDirectory + name;
        this.images.push({ name: name, path: this.userProfilePicture, filePath: filePath });
      }
    });  
  }

  async tryUpdateProfile(value){

    this.isUpdating = true;
    value.token = this.token;
    this.userService.updateProfile(value).subscribe((userprofileinfo) => {
      this.isUpdating = false;
      this.presentAlert("Updated Successfully.");
    },
    (err) => {
      this.isUpdating = false;
      this.presentAlert(err.error.code);
    });
  }  
 
  loadStoredImages() {
    this.storageService.getObject(profile_photo).then((result: any) => {
      if (result) {
        let arr = result;
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
        quality: 50,
        targetWidth: 300,
        targetHeight: 300,
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
        this.startUpload();
    }, error => {
        this.presentToast('Error while storing file.');
    });
  }
  updateStoredImages(name) {
//    this.profile_photoInfo = this.storageService.getObject(profile_photo);
        let newImages = [name];
        this.storageService.setObject(profile_photo, newImages);
        let filePath = this.file.dataDirectory + name;
        let resPath = this.pathForImage(filePath);
        let newEntry = {
            name: name,
            path: resPath,
            filePath: filePath
        };
        this.images = [newEntry, ...this.images];
        this.ref.detectChanges(); // trigger change detection cycle
  }
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
  // deleteImage() {
  //   //this.images.splice(position, 1);
 
  //   this.storage.get(profile_photo).then(images => {
  //       let arr = JSON.parse(images);
  //       let filtered = arr.filter(name => name != this.images[0].name);
  //       this.storage.set(profile_photo, JSON.stringify(filtered));
 
  //       var correctPath = this.images[0].name.filePath.substr(0, this.images[0].name.filePath.lastIndexOf('/') + 1);
 
  //       this.file.removeFile(correctPath, this.images[0].name.name).then(res => {
  //           this.presentToast('File removed.');
  //       });
  //   });
  // }
  startUpload() {
    this.file.resolveLocalFilesystemUrl(this.images[0].filePath)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file))
        })
        .catch(err => {
            this.presentToast('Error while reading file.');
        });
  }
 
  readFile(file: any) {
      const reader = new FileReader();
      reader.onload = () => {
          const formData = new FormData();
          const imgBlob = new Blob([reader.result], {
              type: file.type
          });
          formData.append('file', imgBlob, file.name);
          formData.append('token', this.token);
          this.uploadImageData(formData);
      };
      reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
        message: 'uploading...',
    });
    await loading.present();

    this.userService.uploadProfilePhoto(formData).subscribe((userprofileinfo) => {
      loading.dismiss();
      console.log("userprofileinfo", userprofileinfo);
      this.presentAlert("Uploaded Successfully.");
    },
    (err) => {
      loading.dismiss();
      // alert("aaaaaa");
      console.log("profile photo uploading error", err);

      // this.presentAlert(JSON.stringify(err));
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
  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 3000,
      message: value,
      mode: 'ios'
    });
    await loading.present();
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
  back(){
    this.location.back();
  }
}
