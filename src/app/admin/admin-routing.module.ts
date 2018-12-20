import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';

import {ShippingDetailsComponent} from './shipping-details/shipping-details.component'
const routes: Routes = [{path:'admin',component:HomeComponent},{path:'admin/order',component:OrdersComponent},{path:'admin/customer',component:CustomerDetailsComponent},{path:'admin/supplier',component:SupplierDetailsComponent},{path:'admin/shipping',component:ShippingDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
