import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartCustomerComponent } from './cart-customer/cart-customer.component';
import { HomeComponent as customerHomeCumponent } from './home/home.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { AuthGuard } from '../auth-guard.service';
import { OrderComponent } from './order/order.component'
import { IsCustomerGuard } from '../guard/is-customer.guard'
const routes: Routes = [{path:"customer/cart",component:CartCustomerComponent,canActivate:[AuthGuard,IsCustomerGuard]},
{path:"customer",component:customerHomeCumponent},{path:"customer/dashboard",component:CustomerDashboardComponent},
{path:"customer/register",component:RegisterCustomerComponent},
{path:"customer/order",component:OrderComponent,canActivate:[AuthGuard,IsCustomerGuard]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
