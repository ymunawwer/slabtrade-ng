import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [    HomeComponent,
 
    OrdersComponent,
 
    CustomerDetailsComponent,
 
    SupplierDetailsComponent,
 
    ShippingDetailsComponent,

    SidebarComponent,

    NavbarComponent

    ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
