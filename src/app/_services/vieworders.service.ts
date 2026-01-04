import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewordersService {

  constructor(private http:HttpClient) { }
  private API_URL = 'http://localhost:8085/orders';
  getOrdersByUser(userId: number): Observable<any> {
    const page=0;
    const size=5;
    return this.http.get(`${this.API_URL}/user/${userId}?page=${page}&size=${size}`);
  }
}
