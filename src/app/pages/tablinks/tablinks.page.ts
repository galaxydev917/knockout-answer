import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.page.html',
  styleUrls: ['./tablinks.page.scss'],
})
export class TablinksPage implements OnInit {
  // logined_userinfo : any;
  // loadingUserInfo = false;
  constructor(
    public userService: UserService) { }

  ngOnInit() {
    
    // this.userService.getUserInfo().subscribe(data => {
    //    this.loadingUserInfo = data.loading;
    //     this.logined_userinfo =  data.logined_userinfo[0]; 
    // });
    alert("aaaa");
  }

}
