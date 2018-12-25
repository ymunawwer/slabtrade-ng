import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import { ForgotPasswordComponent } from '../app/forgot-password/forgot-password.component';
import { CustomerDashboardComponent } from '../app/customer/customer-dashboard/customer-dashboard.component';
import { RegisterCustomerComponent } from '../app/customer/register-customer/register-customer.component';
import { CartCustomerComponent } from '../app/customer/cart-customer/cart-customer.component';
import { SupplierRegisterComponent } from '../app/supplier/supplier-register/supplier-register.component';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent as supplierHomeComponent } from '../app/supplier/home/home.component'
import { HomeComponent as customerHomeCumponent } from '../app/customer/home/home.component'
import { LoginRegisterComponent } from './login-register/login-register.component';
import { IsCustomerGuard } from './guard/is-customer.guard'
import { IsSupplierGuard } from './guard/is-supplier.guard'
import { IsAdminGuard } from './guard/is-admin.guard';

const routes: Routes = [
  {path: 'db', component: CustomerDashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path:'customer/register',component:RegisterCustomerComponent},
  {path:'customer/cart',component:CartCustomerComponent,canActivate:[AuthGuard,IsCustomerGuard]},
  {path:'supplier/register',component:SupplierRegisterComponent},{path:'register',component:LoginRegisterComponent},
  { path: '',
  redirectTo: '/customer',
  pathMatch: 'full'
}
  // {path: 'customer', component: customerHomeCumponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
