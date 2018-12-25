import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { SupplierRoutingModule } from './supplier-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

import { CreateBundleComponent } from './create-bundle/create-bundle.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent as supplierHomeComponent } from './home/home.component'
import { HttpModule } from '@angular/http';
import { FirstPageComponent } from './first-page/first-page.component'
@NgModule({
  declarations: [SidebarComponent,supplierHomeComponent,NavbarComponent,FirstPageComponent,CreateBundleComponent,AllOrdersComponent,AllProductsComponent,SettingsComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    HttpModule
  ]
})
export class SupplierModule { }
