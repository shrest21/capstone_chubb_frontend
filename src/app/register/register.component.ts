import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../_services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private registerService:RegisterService){}
  name = '';
  email = '';
  password = '';
   register() {
    const payload ={
      name:this.name,
      email:this.email,
      password:this.password
    };
    console.log(payload);
    this.registerService.createUser(payload).subscribe({
      next: (response) => {alert(`Registration Succesful`);},
      error: (error) => {console.error(error);    }});
  }
}