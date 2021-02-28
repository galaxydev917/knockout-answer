import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';

const baseUrl = config.api_baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList(){
    return this.http.get<any>(baseUrl + '/get_categories');
  }

  updateMyCategories(param : any){
    return this.http.post<any>(baseUrl + '/update_mycategory', param);
  }
}
