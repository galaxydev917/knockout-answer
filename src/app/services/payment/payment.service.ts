import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';

const payment_url = config.payment_baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  connectAccount(){
    return this.http.post<any>(payment_url + '/onboard-user', {});
  }
}
