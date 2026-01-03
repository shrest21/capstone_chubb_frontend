import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  constructor(private productService:ProductService){}
   products: any[] = [];
   ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {console.log('Products from backend:', data);
        this.products = data;},
      error: (err) => {console.error(err);}});
  }
}
