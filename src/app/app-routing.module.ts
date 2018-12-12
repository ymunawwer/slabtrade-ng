import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import { ForgotPasswordComponent } from '../app/forgot-password/forgot-password.component';
import { CustomerDashboardComponent } from '../app/customer-dashboard/customer-dashboard.component';
import { RegisterCustomerComponent } from '../app/register-customer/register-customer.component';
import { CartCustomerComponent } from '../app/cart-customer/cart-customer.component';
import { SupplierRegisterComponent } from '../app/supplier-register/supplier-register.component';

const routes: Routes = [
  {path: 'db', component: CustomerDashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path:'register',component:RegisterCustomerComponent},
  {path:'',component:CartCustomerComponent},
  {path:'supplier_register',component:SupplierRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
