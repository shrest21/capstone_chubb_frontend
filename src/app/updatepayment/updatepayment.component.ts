import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdatepaymentService } from '../_services/updatepayment.service';

@Component({
  selector: 'app-updatepayment',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './updatepayment.component.html',
  styleUrl: './updatepayment.component.css'
})
export class UpdatepaymentComponent {
  invoiceId=0;
  status='';
  constructor(private updatepaymentService:UpdatepaymentService){}
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
