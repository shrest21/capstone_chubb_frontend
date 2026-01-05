import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehousestockService {
  private API_URL='http://localhost:8085/warehouses';
  constructor(private http:HttpClient) { }
  getWarehouseStock(code: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${code}`,{withCredentials:true});
  }
  updateWarehouseStock(code: string, payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${code}`, payload,{withCredentials:true});
  }
}
