import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { HttpClient } from '@angular/common/http';
const baseUrl = config.api_baseUrl;
const authUrl = config.api_authUrl;

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
  ) { }

  completeRequest(param : any){
    return this.http.post<any>(baseUrl + '/complete_request', param);
  }
  
}
