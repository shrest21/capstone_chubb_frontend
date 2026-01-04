import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  logout(): Observable<any> {
    return this.http.post('http://localhost:8085/auth/logout',{},{ withCredentials: true });
  }
}
