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

}





  // private getQuery<T>( query: string ) {
  //   query = baseUrl + query;
  //   return this.http.get<T>( query );
  // }
  // private postQuery<T>( query: string, param: any ) {
  //   query = baseUrl + query;
  //   return this.http.post<T>( query, param );
  // }
  // private postProUserQuery<T>( query: string, param: any ) {
  //   query = baseUrl + query;
  //   return this.http.post<UserObject>( query, param );
  // }
  // private postProfileQuery<T>( query: string, param: any ) {
  //   query = baseUrl + query;
  //   return this.http.post<ProfileObject>( query, param );
  // }
  // private authQuery<T>( query: string, param: any ) {
  //   return this.http.post<UserObject>( query, param );
  // }

  // createUser(value : any) {
  //   return this.postQuery<any[]>(`/register`, value);
  // }

 

  // resetPassword( value: any){
  //   return this.postQuery<any[]>('/RetrivePassword', value);
  // }  
  
  // updateProfile( value: any){

  //   return this.postProfileQuery<ProfileObject[]>('/UpdateProfile', value);
  // }  

  // uploadProfilePhoto(formData : FormData){
  //   return this.postQuery<any[]>('/Update_profile_pic', formData);    
  // }
  // getProUsers(param : any){
  //   return this.postProUserQuery<UserObject[]>('/get_users', param);
  // }
// }
