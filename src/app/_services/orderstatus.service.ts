import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderstatusService {

  constructor(private http:HttpClient) { }
  private API_URL='http://localhost:8085/orders';
  showorders():Observable<any>{
    return this.http.get(this.API_URL,{withCredentials:true});
  }
  
}
