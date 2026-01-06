import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../_services/invoice.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{
  invoices: any[] = [];
  constructor(private invoiceService:InvoiceService,private storageService:StorageService,private route:Router){}
  ngOnInit(): void {
    const user=this.storageService.getUser();
    if(user.role!="ROLE_FINANCE_OFFICER"){
      alert('Please login as finance officer to view');
      this.route.navigate(['/products']);
    }
    this.showInvoices();
  }
  showInvoices(){
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {this.invoices = data;},
      error: (err) => {console.error(err);}
    });
  }
}
