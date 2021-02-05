import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';

const payment_url = config.payment_baseUrl;
const baseUrl = config.api_baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  creatNewAccount(param : any){
    return this.http.post<any>(baseUrl + '/add_connectaccount', param);
  }

  connectAccount(){
    return this.http.post<any>(payment_url + '/onboard-user', {});
  }  
}
