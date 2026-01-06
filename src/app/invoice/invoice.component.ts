import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../_services/invoice.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-invoice',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{
  invoices: any[] = [];
  todaysInvoices: any[] = [];
  todayLabel: string = '';
  todayTotal: number = 0;
  constructor(private invoiceService:InvoiceService,private storageService:StorageService,private route:Router){}
  ngOnInit(): void {
    const user=this.storageService.getUser();
    if(user.role!="ROLE_FINANCE_OFFICER"){
      alert('Please login as finance officer to view');
      this.route.navigate(['/products']);
    }
    this.showInvoices();
    const today = new Date();
    this.todayLabel = today.toLocaleDateString('en-IN', {day: 'numeric',month: 'short',year: 'numeric'});
  }
  showInvoices(){
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {this.invoices = data;
        this.filterTodaysInvoices();
        this.renderMonthlyChart();
        this.calculateTodayTotal();
      },
      error: (err) => {console.error(err);}
    });
  }
  filterTodaysInvoices() {
    const today = new Date().toDateString();

    this.todaysInvoices = this.invoices.filter(inv =>
      new Date(inv.createdAt).toDateString() === today
    );
  }
  renderMonthlyChart() {
    const salesMap = new Map<string, number>();
    const now = new Date();

    this.invoices.forEach(inv => {
      const date = new Date(inv.createdAt);
      if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        const day = date.getDate().toString();
        salesMap.set(day, (salesMap.get(day) || 0) + inv.amount);
      }
    });

    const labels = Array.from(salesMap.keys());
    const data = Array.from(salesMap.values());

    new Chart('monthlySalesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales (₹)',
          data: data
        }]
      }
    });
  }
  calculateTodayTotal() {
    this.todayTotal = this.todaysInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  }
}