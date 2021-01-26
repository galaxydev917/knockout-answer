import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading/loading.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { VideoPickerComponent } from './video-picker/video-picker.component';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoadingComponent,
    ImagePickerComponent,
    VideoPickerComponent
  ],
  exports: [
    LoadingComponent,
    ImagePickerComponent,
    VideoPickerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
