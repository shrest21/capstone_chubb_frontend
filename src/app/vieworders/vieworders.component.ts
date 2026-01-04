import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ViewordersService } from '../_services/vieworders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vieworders',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './vieworders.component.html',
  styleUrl: './vieworders.component.css'
})
export class ViewordersComponent implements OnInit {

  orders: any[] = [];
  isLoggedIn = false;

  constructor(
    private storageService: StorageService,
    private viewOrdersService: ViewordersService
  ) {}

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.isLoggedIn = !!user;

    if (this.isLoggedIn) {
      this.loadOrders();
    }
  }

  loadOrders(): void {
    const user = this.storageService.getUser();
    const userId = user.userId;

    this.viewOrdersService.getOrdersByUser(userId).subscribe({
      next: (response) => {
        this.orders = response.content;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }
}
