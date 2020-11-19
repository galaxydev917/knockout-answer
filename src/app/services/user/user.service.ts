import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UserObject } from  '../../interfaces/interfaces';
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
    console.log("query", query);
    return this.http.post<T>( query, param );
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
 
}
