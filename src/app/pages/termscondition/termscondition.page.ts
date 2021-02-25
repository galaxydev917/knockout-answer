import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-termscondition',
  templateUrl: './termscondition.page.html',
  styleUrls: ['./termscondition.page.scss'],
})
export class TermsconditionPage implements OnInit {

  constructor(
    private router: Router,
    public menuCtrl: MenuController,
    private location: Location,
  ) { }

  ngOnInit() {
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
  back(){
    this.location.back();
  }
}
