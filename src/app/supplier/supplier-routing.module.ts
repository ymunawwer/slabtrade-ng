import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

import { IsSupplierGuard } from '../guard/is-supplier.guard'

import { CreateBundleComponent } from './create-bundle/create-bundle.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent  } from './home/home.component';
import { AuthGuard } from '../auth-guard.service';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [{path:"supplier",component:HomeComponent,canActivate:[AuthGuard,IsSupplierGuard]},
{path:"supplier/createbundle",component:CreateBundleComponent,canActivate:[AuthGuard,IsSupplierGuard]},
{path:"supplier/dashboard",component:CreateBundleComponent,canActivate:[AuthGuard,IsSupplierGuard]},
{path:"supplier/orders",component:AllOrdersComponent,canActivate:[AuthGuard,IsSupplierGuard]},
{path:"supplier/products",component:AllProductsComponent,canActivate:[AuthGuard,IsSupplierGuard]},
{path:"supplier/setting",component:SettingsComponent,canActivate:[AuthGuard,IsSupplierGuard]},
{path:"supplier/editProduct/:id",component:EditProductComponent,canActivate:[AuthGuard,IsSupplierGuard]},
{path:"supplier/OrderDetailComponent/:id",component:OrderDetailComponent,canActivate:[AuthGuard,IsSupplierGuard]},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
