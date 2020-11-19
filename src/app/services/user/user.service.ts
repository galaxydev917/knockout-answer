import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UserObject, ProfileObject } from  '../../interfaces/interfaces';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

const baseUrl = config.api_baseUrl;
const authUrl = config.api_authUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( 
    private http: HttpClient,
    ) { }
  
  // private getQuery<T>( query: string ) {
  //   query = baseUrl + query;
  //   return this.http.get<T>( query );
  // }
  private postQuery<T>( query: string, param: any ) {
    query = baseUrl + query;
    return this.http.post<T>( query, param );
  }
  private postProUserQuery<T>( query: string, param: any ) {
    query = baseUrl + query;
    return this.http.post<UserObject>( query, param );
  }
  private postProfileQuery<T>( query: string, param: any ) {
    query = baseUrl + query;
    return this.http.post<ProfileObject>( query, param );
  }
  private authQuery<T>( query: string, param: any ) {
    return this.http.post<UserObject>( query, param );
  }

  createUser(value : any) {
    return this.postQuery<any[]>(`/register`, value);
  }

  doLogin( value: any){
    let credential = {
      username : value.email,
      password : value.password
    }
    return this.authQuery<UserObject[]>(authUrl, credential);
  }   

  resetPassword( value: any){
    return this.postQuery<any[]>('/RetrivePassword', value);
  }  
  updateProfile( value: any){

    return this.postProfileQuery<ProfileObject[]>('/UpdateProfile', value);
  }  

  uploadProfilePhoto(formData : FormData){
    return this.postQuery<any[]>('/Update_profile_pic', formData);    
  }
  getProUsers(param : any){
    return this.postProUserQuery<UserObject[]>('/get_users', param);
  }
}
