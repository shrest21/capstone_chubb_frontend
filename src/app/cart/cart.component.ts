import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../_services/cart.service';
import { ProductService } from '../_services/product.service';

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
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const cart = this.cartService.getCart();

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;

        // merge cart + product data
        this.cartItems = cart.map(item => {
          const product = this.products.find(p => p.id === item.productId);
          return {
            ...item,
            name: product?.name,
            price: product?.price,
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
}
