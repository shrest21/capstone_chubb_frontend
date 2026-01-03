import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL ='http://localhost:8085/products';
  constructor(private http: HttpClient) { }
  getProducts():Observable<any[]>{
    return this.http.get<any[]>(this.API_URL);
  }
}
