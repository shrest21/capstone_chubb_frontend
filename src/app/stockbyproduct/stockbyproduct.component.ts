import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WarehousestockService } from '../_services/warehousestock.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stockbyproduct',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './stockbyproduct.component.html',
  styleUrl: './stockbyproduct.component.css'
})
export class StockbyproductComponent implements OnInit{
  productId!: number;
  stockList: any[] = [];
  constructor(private warehousestockService:WarehousestockService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.showstock();
  }
  showstock(){
    this.warehousestockService.stockbyproductId(this.productId).subscribe({
      next: (data) => {this.stockList = data;},
      error: (err) => {console.error('Failed to load product stock', err);}
    });
  }
}
