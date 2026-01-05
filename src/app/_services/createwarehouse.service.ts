import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatewarehouseService {
  private API_URL='http://localhost:8085/warehouses';
  constructor(private http:HttpClient) { }
  create(payload:any):Observable<any>{
    return this.http.post(this.API_URL,payload,{withCredentials:true});
  }
}
