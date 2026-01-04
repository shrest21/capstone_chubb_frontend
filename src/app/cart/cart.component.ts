import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../_services/cart.service';
import { ProductService } from '../_services/product.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  products: any[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private storageService:StorageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const cart = this.cartService.getCart();

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;

        // merging cart + product data
        this.cartItems = cart.map(item => {
          const product = this.products.find(p => p.id === item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            name: product.name,
            price: product.price,
            total: product ? product.price * item.quantity : 0
          };
        });
      },
      error: (err) => console.error(err)
    });
  }
  getGrandTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }
  checkout():void {
    const user = this.storageService.getUser();
    if (!user.userId) {
      alert('Please login to continue');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/order']);
  }
}
