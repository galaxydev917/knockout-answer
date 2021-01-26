import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-video-picker',
  templateUrl: './video-picker.component.html',
  styleUrls: ['./video-picker.component.scss'],
})
export class VideoPickerComponent implements OnInit {
  usefilePicker = true;

  constructor(
    private platform: Platform,
  ) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usefilePicker = true;
    }
  }
}
