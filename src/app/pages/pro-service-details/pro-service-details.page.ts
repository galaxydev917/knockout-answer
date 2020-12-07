import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-pro-service-details',
  templateUrl: './pro-service-details.page.html',
  styleUrls: ['./pro-service-details.page.scss'],
})
export class ProServiceDetailsPage implements OnInit {
  service_request : any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public menuCtrl: MenuController,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service_request = this.router.getCurrentNavigation().extras.state.service_request;
      }
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
