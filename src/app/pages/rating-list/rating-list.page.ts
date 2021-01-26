import { Component, OnInit } from '@angular/core';
import { config } from '../../config/config';

import { StorageService } from '../../services/storage.service';
import { RatingService } from '../../services/rating/rating.service';

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

  constructor(
    public storageService: StorageService,
    public ratingService: RatingService,
  ) { }

  ngOnInit() {
  }


}
