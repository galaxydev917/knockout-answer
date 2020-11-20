import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';

const baseUrl = config.api_baseUrl;
const authUrl = config.api_authUrl;

@Injectable({
  providedIn: 'root'
})
export class RequestService {


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

  createService( value: any){
    return this.postQuery<any[]>('/create_request', value);
  }  

}
