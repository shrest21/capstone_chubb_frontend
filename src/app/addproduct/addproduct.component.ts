import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddproductService } from '../_services/addproduct.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit{
  constructor(private addprodcutService:AddproductService,private storageService:StorageService,private router:Router){}
  name='';
  description='';
  brand='';
  price='';
  ngOnInit(): void {
    const user = this.storageService.getUser();

    if (user.role!="ROLE_ADMIN") {
      alert('Please login as Admin to continue');
      this.router.navigate(['/login']);
    }
  }
  addProduct(){
    const payload={
      name:this.name,
      description:this.description,
      brand:this.brand,
      price:this.price
    };
    this.addprodcutService.add(payload).subscribe({
      next: (response) => {
        alert("Product added succesfully");
        this.name='';
        this.brand='';
        this.description='';
        this.price='';
      },
      error: (error) => {console.error('Error adding product', error);}});
  }
}
