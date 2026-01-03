import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService:LoginService){}
  email='';
  password='';
  login(){
    const payload={
      email:this.email,
      password:this.password
    };
    this.loginService.loginUser(payload).subscribe({
      next:(response)=>{console.log(response);},
      error:(error)=>{console.error(error);}
    });
  }
}
