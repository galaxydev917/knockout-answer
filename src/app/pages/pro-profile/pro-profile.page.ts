import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, ToastController, Platform, LoadingController  } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user/user.service';
import { config } from '../../config/config';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';


const profile_photo = config.PROFILE_PHOTO_STORAGE_KEY;
const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-pro-profile',
  templateUrl: './pro-profile.page.html',
  styleUrls: ['./pro-profile.page.scss'],
})
export class ProProfilePage implements OnInit {
  rowHeight : any;
  avatar_top: any;
  negative_card_marginTop: any;
  images = [];
  fullName = "";
  validationsform: FormGroup;
  isUpdating = false;
  token : any;
  constructor(
    public plt: Platform,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private camera: Camera,
    private filePath: FilePath,
    private actionSheetController: ActionSheetController,
    private storage: Storage,
    public loadingController: LoadingController,
    private webview: WebView,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private file: File,
  ) { }

  ngOnInit() {
    //this.rowHeight = this.plt.height() / 3 + 'px';
    this.validationsform = this.formBuilder.group({
      contact_email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      service_price: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
    this.getStorageUserInfo();
  }

  async tryUpdateProfile(value){

    this.isUpdating = true;
    value.token = this.token;
    this.userService.updateProfile(value).subscribe((userprofileinfo) => {
      this.isUpdating = false;
      this.storage.set(userinfo, userprofileinfo.profile);
      this.presentAlert("Updated Successfully.");

    },
    (err) => {
      this.isUpdating = false;
      this.presentAlert(err.error.msg);
    });
  }  

  getStorageUserInfo(){
    this.storage.get(userinfo).then(userInfo=>{
      this.fullName = userInfo.first_name + " " + userInfo.last_name;
      this.token = userInfo.token;
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
        quality: 50,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        encodingType: this.camera.EncodingType.JPEG,
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
            console.log("111111111111111", this.pathForImage(correctPath + currentName));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            this.startUpload();
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
        console.log("22222222222=======", resPath);
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
          console.log("file name==================", file.name);
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
      this.presentAlert("Uploaded Successfully.");
    },
    (err) => {
      loading.dismiss();
      this.presentAlert(err.error.msg);
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
  
}
