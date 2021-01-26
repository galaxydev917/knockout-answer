import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MenuController, LoadingController } from '@ionic/angular';
import { Location } from "@angular/common";
import { AnswerService } from '../../services/answer/answer.service';
import { RequestService } from '../../services/request/request.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  service_request : any;
  answer_videolist = [];
  isLoading = false;
  isAnswerExist = false;
  ratingform: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,

    private location: Location,
    public streamingMedia: StreamingMedia, 
    public answerService: AnswerService,
    public loadingController: LoadingController,
    public requestService: RequestService,
  ) { }

  ngOnInit() {
    this.ratingform = this.formBuilder.group({
      starRating: new FormControl()
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service_request = this.router.getCurrentNavigation().extras.state.service_request;
        console.log("this.service_request", this.service_request);
        this.ratingform.setValue({
          starRating: [this.service_request.rating]
        });
        this.getAnswerByRequestId(this.service_request)
      }
    });



  }

  getAnswerByRequestId(request){
    let param = {
      request_id: request.id,
      token: request.token
    };
    this.isLoading = true;
    this.answerService.getAnswerByRequestId(param).subscribe( videos => {
      this.answer_videolist = videos;

      if(this.answer_videolist.length > 0)
        this.isAnswerExist = true;
      else
        this.isAnswerExist = false;
      this.isLoading = false;
    },
    (err) => {
      this.isAnswerExist = false;
      this.isLoading = false;
    });
  }
  
  playVideo(val) {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played'); },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'portrait'
    };
    this.streamingMedia.playVideo(val.attached_videoid, options);
  }

  async completeRequest(){


    const loading = await this.loadingController.create({
      message: 'Completing...',
    });
    await loading.present();
    console.log("this.service_request", this.service_request);
    this.requestService.completeRequest(this.service_request).subscribe((result) => {
      console.log(result);
      loading.dismiss();
      let navigationExtras: NavigationExtras = {
        state: {
          service_request: this.service_request
        }
      };    
      this.router.navigate(['/rating'], navigationExtras);
      // this.pro_userlist = pro_userlist;
      // this.isLoading = false;
    },
    (err) => {
      loading.dismiss();
       this.presentAlert(err.error.msg);
    });
  }

  back(){
    this.location.back();
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
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
}
