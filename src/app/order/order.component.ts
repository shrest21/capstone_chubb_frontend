import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../_services/cart.service';
import { ProductService } from '../_services/product.service';
import { StorageService } from '../_services/storage.service';
import { OrderService } from '../_services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  name = '';
  address = '';
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private storageService: StorageService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const cart = this.cartService.getCart(); // minimal data

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.cartItems = cart.map(item => {
          const product = products.find(p => p.id === item.productId);

          return {
            productId: item.productId,
            quantity: item.quantity,
            name: product.name,
            price: product.price
          };
        });
      },
      error: (err) => console.error(err)
    });
  }
  getGrandTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
  }
  placeOrder(): void {
    const user = this.storageService.getUser();
    if (!user.userId) {
      alert('Please login to continue');
      this.router.navigate(['/login']);
      return;
    }

    const payload = {
      customerId: user.userId,
      customerName: this.name,
      address: this.address,
      items: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(payload).subscribe({
      next: () => {
        alert('Order placed successfully');
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
      },
      error: (err) => console.error(err)
    });
  }
}
