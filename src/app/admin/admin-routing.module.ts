import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { IsAdminGuard } from '../guard/is-admin.guard';
import {ShippingDetailsComponent} from './shipping-details/shipping-details.component';
import {LoginComponent} from './login/login.component';
import { MapComponent } from './map/map.component';
import { AuthGuard } from '../auth-guard.service';
// const routes: Routes = [{path:'admin',component:LoginComponent},{path:'admin/home',component:HomeComponent,canActivate:[AuthGuard,IsAdminGuard]},{path:'admin/order',component:OrdersComponent,canActivate:[AuthGuard,IsAdminGuard]},{path:'admin/customer',component:CustomerDetailsComponent,canActivate:[AuthGuard,IsAdminGuard]},{path:'admin/supplier',component:SupplierDetailsComponent,canActivate:[AuthGuard,IsAdminGuard]},{path:'admin/map',component:MapComponent,canActivate:[AuthGuard,IsAdminGuard]},{path:'admin/shipping',component:ShippingDetailsComponent,canActivate:[AuthGuard,IsAdminGuard]}];
import { SalesReportComponent } from './sales-report/sales-report.component';
import { CreateDealComponent } from './create-deal/create-deal.component';
import { DealsComponent } from './deals/deals.component';
const routes: Routes =

[
  {path:'admin',component:LoginComponent},
  {path:'admin/home',component:HomeComponent,canActivate:[AuthGuard,IsAdminGuard]},
  {path:'admin/order',component:OrdersComponent,canActivate:[AuthGuard,IsAdminGuard]},
  {path:'admin/customer',component:CustomerDetailsComponent,canActivate:[AuthGuard,IsAdminGuard]},
  {path:'admin/supplier',component:SupplierDetailsComponent,canActivate:[AuthGuard,IsAdminGuard]},
  {path:'admin/shipping',component:ShippingDetailsComponent,canActivate:[AuthGuard,IsAdminGuard]},
  {path: 'admin/sales-report', component: SalesReportComponent, canActivate: [AuthGuard, IsAdminGuard]},
  {path: 'admin/createDeal', component: CreateDealComponent, canActivate: [AuthGuard, IsAdminGuard]},
  {path: 'admin/deals', component: DealsComponent, canActivate: [AuthGuard, IsAdminGuard]},
  {path:'admin/map',component:MapComponent,canActivate:[AuthGuard,IsAdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
