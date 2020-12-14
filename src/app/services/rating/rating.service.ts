import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { HttpClient } from '@angular/common/http';
const baseUrl = config.api_baseUrl;
const authUrl = config.api_authUrl;

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private http: HttpClient
  ) { }

  submitFeedback(param : any){
    return this.http.post<any>(baseUrl + '/submit_feedback', param);
  }
  getRatingByRequstId(param : any){
    return this.http.post<any>(baseUrl + '/get_rating_by_requestid', param);
  }
}
