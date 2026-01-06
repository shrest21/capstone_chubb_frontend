import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http:HttpClient) { }
  private API_URL='http://localhost:8085/invoices';
  getInvoices():Observable<any>{
    return this.http.get(this.API_URL,{withCredentials:true});
  }
}
