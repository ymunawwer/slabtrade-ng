import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CustomerListDetailsComponent } from './customer-list-details/customer-list-details.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [    HomeComponent,
 
    OrdersComponent,
 
    CustomerDetailsComponent,
 
    SupplierDetailsComponent,
 
    ShippingDetailsComponent,

    SidebarComponent,

    NavbarComponent,

    CustomerListDetailsComponent,

    LoginComponent,

    MapComponent

    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
   
  ]
})
export class AdminModule { }
