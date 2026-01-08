import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import {Router} from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService:LoginService,private router: Router,private storageService: StorageService,){}
  email='';
  password='';
  login(){
    if (!this.email.includes('@') || !this.email.includes('.')) {
      alert('Please enter a valid email');
      return;
    }
    if (this.password.length < 5) {
      alert('Password must be at least 5 characters long');
      return;
    }
    const payload={
      email:this.email,
      password:this.password
    };
    this.loginService.loginUser(payload).subscribe({
      next:(response)=>{console.log("Login Success: ",response);
        this.storageService.saveUser(response);
        window.location.href = '/products';
      },
      error:(error)=>{console.error("Login failed: ",error);}
    });
  }
}
