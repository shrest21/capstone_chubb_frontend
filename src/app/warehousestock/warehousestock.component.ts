import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehousestockService } from '../_services/warehousestock.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-warehousestock',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './warehousestock.component.html',
  styleUrl: './warehousestock.component.css'
})
export class WarehousestockComponent implements OnInit{
  constructor(private route:ActivatedRoute,private warehousestockService:WarehousestockService){}
  warehouseCode!: string;
  stockItems: any[] = [];
  productId!: number;
  quantity!: number;
  ngOnInit(): void {
    this.warehouseCode = this.route.snapshot.paramMap.get('code')!;
    this.loadStock(); 
  }
  loadStock(): void {
    this.warehousestockService.getWarehouseStock(this.warehouseCode).subscribe({
        next: (data) => {this.stockItems = data;console.log("Stock: ",this.stockItems);},
        error: (err) => {console.error('Failed to load stock', err);}
      });
  }
  updateWarehouse(): void {
    const payload = {
      productId: this.productId,
      quantity: this.quantity
    };
    this.warehousestockService
      .updateWarehouseStock(this.warehouseCode, payload)
      .subscribe({
        next: () => {this.loadStock();this.productId = 0;this.quantity = 0;},
        error: (err) => {console.error('Failed to update warehouse', err);}
      });
  }
}
