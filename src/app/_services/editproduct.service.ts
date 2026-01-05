import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditproductService {

  constructor(private http:HttpClient) { }
  editProduct(payload:any,productId:number):Observable<any>{
    return this.http.put(`http://localhost:8085/products/${productId}`,payload,{withCredentials:true});
  }
  deleteProduct(productId:number){
    return this.http.delete(`http://localhost:8085/products/${productId}`,{withCredentials:true});
  }
}
