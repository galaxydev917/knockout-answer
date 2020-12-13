import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Location } from "@angular/common";
import { AnswerService } from '../../services/answer/answer.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public menuCtrl: MenuController,
    private location: Location,
    public streamingMedia: StreamingMedia, 
    public answerService: AnswerService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service_request = this.router.getCurrentNavigation().extras.state.service_request;
        
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
      console.log(videos);
      this.answer_videolist = videos;
      if(this.answer_videolist.length > 0)
        this.isAnswerExist = true;
      else
      this.isAnswerExist = false;
      this.isLoading = false;
    },
    (err) => {
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
  back(){
    this.location.back();
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
