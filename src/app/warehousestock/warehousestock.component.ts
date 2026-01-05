import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehousestockService } from '../_services/warehousestock.service';

@Component({
  selector: 'app-warehousestock',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './warehousestock.component.html',
  styleUrl: './warehousestock.component.css'
})
export class WarehousestockComponent implements OnInit{
  constructor(private route:ActivatedRoute,private warehousestockService:WarehousestockService){}
  warehouseCode!: string;
  stockItems: any[] = [];
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
}
