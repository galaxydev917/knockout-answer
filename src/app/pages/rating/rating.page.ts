import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, LoadingController } from '@ionic/angular';
import { Location } from "@angular/common";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RatingService } from '../../services/rating/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
  service_request : any;
  rating = 0;
  rating_readonly = false;
  validationsform: FormGroup;
  showSubmitBtn = false;
  ratingList = [];
  isLoading = false;
  constructor(
    private router: Router,
    public ratingService: RatingService,
    private route: ActivatedRoute,
    public menuCtrl: MenuController,
    private location: Location,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service_request = this.router.getCurrentNavigation().extras.state.service_request;
      }
    });
    this.validationsform = this.formBuilder.group({
      feedback_text: new FormControl('', Validators.compose([
        Validators.required
      ])),
      starRating: new FormControl()
    });
    this.getRatingByRequstId();

  }
  logRatingChange(rating){
    console.log("changed rating: ",rating);
    this.rating = rating;
    // do your stuff
  }

  async tryProvideFeedback(value){
    this.service_request.marks = this.rating;
    this.service_request.feedback_text = value.feedback_text;
    const loading = await this.loadingController.create({
      message: 'Submitting...',
    });
    await loading.present();
    this.ratingService.submitFeedback(this.service_request).subscribe( resp => {
      loading.dismiss();
      this.router.navigate(['/tablinks/profile']);

    },
    (err) => {
    });
  }
  getRatingByRequstId(){
    this.isLoading = true;
    console.log(this.service_request);
    this.ratingService.getRatingByRequstId(this.service_request).subscribe( result => {
      console.log(result);
      this.isLoading = false;
      this.ratingList = result['rating_list'];
      if(result['count'] > 0){
        this.rating_readonly = true;
        this.showSubmitBtn = false;

        this.validationsform.setValue({
          feedback_text: this.ratingList[0].feedback_text,
          starRating: [this.ratingList[0].marks]
       });
      }else{
        this.showSubmitBtn = true;
        this.rating_readonly = false;
        this.validationsform.setValue({
          feedback_text: '',
          starRating: [0]
       });
      }
    },
    (err) => {
      this.isLoading = false;
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
