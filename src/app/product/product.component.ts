import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-product',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  constructor(private productService:ProductService,private cartService: CartService){}
   products: any[] = [];
   productImages: { [key: string]: string } = {
    'MacBook Air M3': 'assets/Images/macbook.png',
    'iPhone 17 Pro': 'assets/Images/iphone17.png',
    'iPhone 11 Pro': 'assets/Images/iphone11.png',
    'iPhone 10 Pro': 'assets/Images/iphone10.png',
    'iPhone 9 Pro': 'assets/Images/iphone9.png'
  };
   ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {console.log('Products from backend:', data);
        this.products = data;},
      error: (err) => {console.error(err);}});
  }
  getImage(productName: string): string 
  {
    return this.productImages[productName] ;
  }
  addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }
}
