import { Component, OnInit } from '@angular/core';
import { config } from '../../config/config';

import { StorageService } from '../../services/storage.service';
import { RatingService } from '../../services/rating/rating.service';
import { Location } from "@angular/common";
import { MenuController, LoadingController } from '@ionic/angular';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.page.html',
  styleUrls: ['./rating-list.page.scss'],
})
export class RatingListPage implements OnInit {
  isLoading = false;
  loginUserInfo : any;
  token : any;
  ratingList = [];

  constructor(
    public storageService: StorageService,
    public ratingService: RatingService,
    public loadingController: LoadingController,
    private location: Location,
    public menuCtrl: MenuController,

  ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.isLoading = true;

    this.getRatingList();
  }

  async getRatingList(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();

    this.loginUserInfo = await this.storageService.getObject(userinfo);
    this.token = this.loginUserInfo.token;

    this.ratingService.getRatingList(this.token).subscribe( result => {
      console.log(result);
      this.ratingList = result.rating_list;
      this.isLoading = false;
      loading.dismiss();
    },
    (err) => {
      this.isLoading = false;
      loading.dismiss();
      // this.presentAlert(err.error.msg);
    });
  }
  back(){
    this.location.back();
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
