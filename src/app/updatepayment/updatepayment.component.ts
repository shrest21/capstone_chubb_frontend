import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdatepaymentService } from '../_services/updatepayment.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepayment',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './updatepayment.component.html',
  styleUrl: './updatepayment.component.css'
})
export class UpdatepaymentComponent implements OnInit{
  invoiceId=0;
  status='';
  constructor(private updatepaymentService:UpdatepaymentService,private storageService:StorageService,private route:Router){}
  ngOnInit(): void {
    const user=this.storageService.getUser();
    if(user.role!="ROLE_FINANCE_OFFICER")
    {
      alert('Please login as finance officer');
      this.route.navigate(['/products']);
    }
  }
  update(){
    const payload={
      status:this.status
    };
    console.log(payload);
    this.updatepaymentService.updateStatus(payload,this.invoiceId).subscribe({
      next:()=>{alert('Payment status updated.');},
      error:(error)=>{console.error(error);}
    });
  }
}
