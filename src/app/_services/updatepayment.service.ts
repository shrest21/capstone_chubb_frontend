import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdatepaymentService {

  private API_URL='http://localhost:8085/invoices';
  constructor(private http:HttpClient) { }
  updateStatus(payload:any,invoiceId:number){
    return this.http.put(`${this.API_URL}/${invoiceId}`,payload,{withCredentials:true});
  }
}
