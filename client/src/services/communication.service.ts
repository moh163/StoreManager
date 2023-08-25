import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { consts } from "@common/const";
import { Item } from '@common/item';
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
  postNewItem(item: Item):Observable<HttpResponse<string>> {
    return this.http.post(`${this.baseUrl}/items`, item,  {observe: 'response',responseType: 'text',});
  }
  getItemsByCat(catName: string): Observable<HttpResponse<object>> {
    return this.http.get(`${this.baseUrl}/items/${catName}`, { observe: 'response' });
  }
  updateStock(stock: number, id: String): Observable<HttpResponse<string>> {
    return this.http.patch(`${this.baseUrl}/items/stock`,{stock: stock, id: id}, { observe: 'response', responseType: 'text' });
  }
  confirmTransaction(itemSold: Item[]): Observable<HttpResponse<String>> {
    return this.http.patch(`${this.baseUrl}/items/soldUnit`,{itemSold: itemSold},{ observe: 'response', responseType: 'text' });
  }
  getTransactionByDate(startDate: Date, endDate:Date): Observable<HttpResponse<object>> {
    return this.http.get(`${this.baseUrl}/transactions/${startDate}/${endDate}`, { observe: 'response' });
  }
}
