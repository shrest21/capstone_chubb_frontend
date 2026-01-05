import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreatewarehouseService } from '../_services/createwarehouse.service';

@Component({
  selector: 'app-createwarehouse',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './createwarehouse.component.html',
  styleUrl: './createwarehouse.component.css'
})
export class CreatewarehouseComponent {
  constructor(private createwarehouseService:CreatewarehouseService){}
  code='';
  location='';
  createWarehouse(){
    const payload={
      code:this.code,
      location:this.location
    };
    this.createwarehouseService.create(payload).subscribe({
      next:(response)=>{console.log("Warehouse created successfully : ",response);
        alert("Warehouse created");
      },
      error:(error)=>{console.error("Warehouse not created , error : ",error);}
    });
  }
}
