import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { CartService } from '../_services/cart.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { EditproductService } from '../_services/editproduct.service';

@Component({
  selector: 'app-product',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  constructor(private productService:ProductService,private cartService: CartService,private storageService:StorageService,private router:Router,private editProductService:EditproductService){}
   products: any[] = [];
   isAdmin = false;
   productImages: { [key: string]: string } = {
    'MacBook Air M3': 'assets/Images/macbook.png',
    'iPhone 17 Pro': 'assets/Images/iphone17.png',
    'iPhone 11 Pro': 'assets/Images/iphone11.png',
    'iPhone 10 Pro': 'assets/Images/iphone10.png',
    'iPhone 9 Pro': 'assets/Images/iphone9.png'
  };
   ngOnInit(): void {
    this.loadProducts();
    const user = this.storageService.getUser();
    if(user.role=="ROLE_ADMIN")
      this.isAdmin=true;
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
  editProduct(productId: number) {
    this.router.navigate(['/editproduct', productId]);
  }
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.editProductService.deleteProduct(productId).subscribe({
        next: () => {this.loadProducts();
          alert("Product deleted successfully");
        },
        error: err => console.error(err)});
      }
    }
}