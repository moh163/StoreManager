import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { consts } from "@common/const";
import { Category } from '@common/categorie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  
  private readonly baseUrl: string = environment.serverUrl;

  constructor(private readonly http: HttpClient) { }


  getAllCategories(): Observable<HttpResponse<object>> {
    return this.http.get(`${this.baseUrl}/categories`, { observe: 'response' });
  }
  postNewCategory(category: Category):Observable<HttpResponse<string>> {
    return this.http.post(`${this.baseUrl}/categories`, category,  {observe: 'response',responseType: 'text',});
  }
}
