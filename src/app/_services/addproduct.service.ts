import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddproductService {
  constructor(private http:HttpClient) { }
  private API_URL='http://localhost:8085/products';
  add(payload:any):Observable<any>{
    return this.http.post(this.API_URL,payload,{withCredentials:true});
  }
}
