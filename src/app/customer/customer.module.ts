import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component'
import { CustomerRoutingModule } from './customer-routing.module';
import { CartCustomerComponent } from './cart-customer/cart-customer.component';
import { HomeComponent as customerHomeCumponent } from './home/home.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderComponent } from './order/order.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [CartCustomerComponent,customerHomeCumponent,CustomerDashboardComponent,SettingsComponent,RegisterCustomerComponent,SidebarComponent,NavbarComponent, OrderComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    NgxLoadingModule
  ]
})
export class CustomerModule { }
