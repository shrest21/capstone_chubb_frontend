import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL ='http://localhost:8085/auth/login';
  constructor(private http: HttpClient) { }
  loginUser(payload:any):Observable<any>{
    return this.http.post(this.API_URL,payload);
  }
}