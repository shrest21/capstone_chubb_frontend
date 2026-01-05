import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { EditproductService } from '../_services/editproduct.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent implements OnInit {

  productId!: number;

  name = '';
  description = '';
  brand = '';
  price: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private editproductService: EditproductService,
    private router: Router,
    private storageService:StorageService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    const user=this.storageService.getUser();
    if(user.role=="ROLE_ADMIN")
    {
      alert("Please login as Admin.");
      this.router.navigate(['/profile']);
    }

    this.productService.getProductById(this.productId).subscribe({
      next: (data:any) => {
        this.name = data.name;
        this.description = data.description;
        this.brand = data.brand;
        this.price = data.price;
      },
      error: err => console.error(err)
    });
  }

  updateProduct() {
    const payload = {
      name: this.name,
      description: this.description,
      brand: this.brand,
      price: this.price
    };

    this.editproductService.editProduct(payload,this.productId).subscribe({
      next: () => {
        alert('Product updated successfully');
        this.router.navigate(['/products']);
      },
      error: err => console.error(err)
    });
  }
}
