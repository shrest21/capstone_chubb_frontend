import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WarehousesService } from '../_services/warehouses.service';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-warehouses',
  standalone:true,
  imports:[CommonModule,RouterModule],
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.css'
})
export class WarehousesComponent implements OnInit {
  constructor(private warehouseService:WarehousesService,private router:Router,private storageService:StorageService){}
  warehouses:any=[];
  ngOnInit(): void {
    const user=this.storageService.getUser();
    if(user.role!="ROLE_WAREHOUSE_MANAGER")
    {
      alert("Pls login as warehouse manager");
      this.router.navigate(['\products']);
    }
    this.loadWarehouses();
  }
  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (data) => {this.warehouses = data;},
      error: (err) => {console.error('Failed to load warehouses', err);}});
    }
  openWarehouse(code: string): void {
    this.router.navigate(['/warehouses', code]);
  }
}
