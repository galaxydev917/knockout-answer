import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Store } from "@ngrx/store";
import * as UserActions from "../../actions/user.actions";
import { AppState,  getUserInfoState } from "../../reducers";

const baseUrl = config.api_baseUrl;
const authUrl = config.api_authUrl;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor( 
    private store: Store<AppState>,
    private http: HttpClient,
    ) { }

  loadUserInfo(userInfo) {
    return this.http.post<any>( baseUrl +'/get_users', userInfo );
    
  }
  requestGetUserInfo(userinfo) {
    this.store.dispatch(new UserActions.RequestGetUserInfo(userinfo));
  }

  // getUserInfo() {
  //   return this.store.select(getUserInfoState);
  // }

  doLogin( value: any){
    let credential = {
      username : value.email,
      password : value.password
    }
    return this.http.post<any>(authUrl, credential);
  }   
  getProfile( token: any){
    return this.http.post<any>( baseUrl +'/getProfile', {token : token} );
  }  
  updateProfile( value: any){
    return this.http.post<any>( baseUrl +'/UpdateProfile', value );
  }  

  uploadProfilePhoto(formData : FormData){
    return this.http.post<any>( baseUrl +'/Update_profile_pic', formData );
  }

  resetPassword( value: any){
    return this.http.post<any>( baseUrl +'/RetrivePassword', value );
  }   
  createUser(value : any) {
    return this.http.post<any>( baseUrl +'/register', value );
  } 
  getUsers(param : any){
    return this.http.post<any>(baseUrl + '/get_users', param);
  }
  createRequest(value: any){
    return this.http.post<any>( baseUrl +'/create_request', value );
  }
  getServiceRequests(param : any){
    return this.http.post<any>(baseUrl + '/get_request', param);
  }
  updateBalance(param: any){
    return this.http.post<any>( baseUrl +'/update_balance', param );
  }
}

