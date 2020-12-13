import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { HttpClient } from '@angular/common/http';

const baseUrl = config.api_baseUrl;
const authUrl = config.api_authUrl;
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(
    private http: HttpClient,
  ) { }

  getVideoList(param : any){
    return this.http.post<any>(baseUrl + '/get_answer_videos', param);
  }

  getAnswerByRequestId(param : any){
    return this.http.post<any>(baseUrl + '/get_special_answer_videos', param);
  }
}
