import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderstatusService } from '../_services/orderstatus.service';

@Component({
  selector: 'app-orderstatus',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './orderstatus.component.html',
  styleUrl: './orderstatus.component.css'
})
export class OrderstatusComponent implements OnInit{
  orders: any[] = [];
  constructor(private orderstatusService:OrderstatusService){}
  ngOnInit(): void {
    this.orderstatusService.showorders().subscribe({
      next: (data) => {this.orders = data;},
      error: (error) => {console.error(error);;}
    });
  }
}
