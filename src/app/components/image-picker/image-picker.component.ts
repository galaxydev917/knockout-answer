import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, SecurityContext } from '@angular/core';
// import { Plugins, Capacitor, CameraSource, CameraResultType, CameraDirection } from '@capacitor/core';
import { Camera, CameraOptions,  Direction, PictureSourceType } from '@ionic-native/Camera/ngx';
import { AlertController, Platform, ActionSheetController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})

export class ImagePickerComponent implements OnInit {
   @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
  @Output() selectPhoto = new EventEmitter<any>();
  @Output() imagePick = new EventEmitter<any>();
  @Input() buttonText: string;
  // @Output() processedPhoto = new EventEmitter<any>();
  // @Output() preSelectedImage = new EventEmitter<string>();
  //@Input() showPreview = false;
  // @Input() showExistingPhoto: string | File;
  // 
  // @Input() cameraDirection: string;

  selectedImage: any;
  showPreview = false;
  usePicker = true;
  isLoading = false;
  blobImage: any;
  croppedImagePath = "";
  photo = {
    name: '',
    path: '',
    filePath: ''
  };
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;

  constructor(
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    private webview: WebView,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    private imageCompress: NgxImageCompressService
  ) { }


  ngOnInit() {
  //   console.log("image component====", this.showExistingPhoto);
  //  if (this.showExistingPhoto) {
  //   this.selectedImage = this.showExistingPhoto['imageUrl'] ? this.showExistingPhoto['imageUrl'] : this.showExistingPhoto;
  //   this.showPreview = true;
  //  }

    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
    }
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header: 'Message',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Use file picker',
          handler: () => {
            if (this.usePicker) {
              this.filePickerRef.nativeElement.click();
              this.isLoading = false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

//   async selectImage() {
//     const actionSheet = await this.actionSheetController.create({
//         header: "Select Image source",
//         buttons: [{
//                 text: 'Load from Library',
//                 handler: () => {
//                     this.onPickImage();
//                 }
//             },
//             {
//                 text: 'Use Camera',
//                 handler: () => {
//                     this.onPickImage(this.camera.PictureSourceType.CAMERA);
//                 }
//             },
//             {
//                 text: 'Cancel',
//                 role: 'cancel'
//             }
//         ]
//     });
//     await actionSheet.present();
// }

  onPickImage() {
    
    if(this.usePicker){
      this.filePickerRef.nativeElement.click();
      this.isLoading = false;
      return;
    }
    var options: CameraOptions = {
        quality: 50,
        targetWidth: 300,
        targetHeight: 300,
        sourceType: this.camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
 
    this.camera.getPicture(options).then(imagePath => {
        if (this.platform.is('android')) {
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
      let filePath = this.file.dataDirectory + newFileName;
      let resPath = this.pathForImage(filePath);

      this.photo.name = newFileName;
      this.photo.path = resPath;
      this.photo.filePath = filePath;

      this.showPreview = true;
      this.selectPhoto.emit(this.showPreview);
      this.convertFiletoBlob();  

    }, error => {
        console.log('Error while storing file.');
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

  convertFiletoBlob() {
    this.file.resolveLocalFilesystemUrl(this.photo.filePath)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file))
        })
        .catch(err => {
            console.log('Error while reading file.');
        });
  }

  readFile(file: any) {
    console.log("readFile", file);
    const reader = new FileReader();
    reader.onload = () => {
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        
        
        this.imagePick.emit(imgBlob);
    };
    reader.readAsArrayBuffer(file);
  }

  onFileChosen(event: any) {
    
    var  fileName : any;
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) return;

    fileName = pickedFile['name'];

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.compressFile(dataUrl, fileName);
    }
    fr.readAsDataURL(pickedFile);
  }

  compressFile(image,fileName) {
    var orientation = -1;
    this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
      this.imgResultAfterCompress = result;
      const imageName = fileName;
      const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
      this.photo.path = this.imgResultAfterCompress;
      this.showPreview = true;
      this.selectPhoto.emit(this.showPreview);
      this.imagePick.emit(imageBlob);
    });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

}
