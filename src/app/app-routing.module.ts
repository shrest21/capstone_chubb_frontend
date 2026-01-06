import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewordersComponent } from './vieworders/vieworders.component';
import { OrderComponent } from './order/order.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CreatewarehouseComponent } from './createwarehouse/createwarehouse.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { WarehousestockComponent } from './warehousestock/warehousestock.component';
import { StockbyproductComponent } from './stockbyproduct/stockbyproduct.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {path:'register',component: RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'products',component:ProductComponent},
  {path:'cart',component:CartComponent},
  {path:'profile',component:ProfileComponent},
  {path:'vieworders',component:ViewordersComponent},
  {path:'order',component:OrderComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'editproduct/:id',component:EditproductComponent},
  {path:'createwarehouse',component:CreatewarehouseComponent},
  {path:'warehouses',component:WarehousesComponent},
  {path:'warehouses/:code',component:WarehousestockComponent},
  {path:'productstock/:id',component:StockbyproductComponent},
  {path:'invoice',component:InvoiceComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
