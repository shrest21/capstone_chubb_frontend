import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private API_URL ='http://localhost:8085/auth/register';
  constructor(private http: HttpClient) { }
  createUser(payload:any):Observable<string>{
    return this.http.post(this.API_URL,payload,{responseType: 'text'});
  }
}
