import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API_URL ='http://localhost:8085/orders';
  constructor(private http: HttpClient) { }
  createOrder(payload:any):Observable<any>{
    return this.http.post(this.API_URL,payload);
  }
}
