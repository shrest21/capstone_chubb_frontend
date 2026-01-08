import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderstatusService } from '../_services/orderstatus.service';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-orderstatus',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './orderstatus.component.html',
  styleUrl: './orderstatus.component.css'
})
export class OrderstatusComponent implements OnInit{
  orders: any[] = [];
  user=this.storageService.getUser();
  selectedStatus: { [orderId: number]: string } = {};
  constructor(private orderstatusService:OrderstatusService,private storageService:StorageService){}
  ngOnInit(): void {
    this.orderstatusService.showorders().subscribe({
      next: (data) => {this.orders = data;},
      error: (error) => {console.error(error);;}
    });
  }
  getStatus(currentStatus: string): string[] {
    if (currentStatus === 'CREATED') {
      return ['PACKED','SHIPPED','DELIVERED','CANCELLED'];
    }
    if (currentStatus === 'PACKED') {
      return ['SHIPPED','DELIVERED','CANCELLED'];
    }
    if (currentStatus === 'SHIPPED') {
      return ['DELIVERED','CANCELLED'];
    }
    return [];
}

  updateStatus(orderId: number) {
    const payload = {
      status: this.selectedStatus[orderId],
      role: this.user.role
    };
    console.log(payload);
    this.orderstatusService.update(payload, orderId).subscribe({
      next: () => {alert('Status updated');
        window.location.reload();
      },
      error: (err) =>{console.error(err);}
    });
  }
}
