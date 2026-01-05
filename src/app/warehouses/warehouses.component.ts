import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WarehousesService } from '../_services/warehouses.service';

@Component({
  selector: 'app-warehouses',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.css'
})
export class WarehousesComponent implements OnInit {
  constructor(private warehouseService:WarehousesService){}
  warehouses:any=[];
  ngOnInit(): void {
    this.loadWarehouses();
  }
  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (data) => {this.warehouses = data;},
      error: (err) => {console.error('Failed to load warehouses', err);}});
    }
}
