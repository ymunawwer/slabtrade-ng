import { NgxLoadingModule } from 'ngx-loading';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



import { SupplierRoutingModule } from './supplier-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

import { CreateBundleComponent } from './create-bundle/create-bundle.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent as supplierHomeComponent } from './home/home.component'
import { HttpModule } from '@angular/http';
import { FirstPageComponent } from './first-page/first-page.component';
import { EditProductComponent } from './edit-product/edit-product.component'

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NewHomeComponent } from './new-home/new-home.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
@NgModule({
  declarations: [SidebarComponent,supplierHomeComponent,NavbarComponent,FirstPageComponent,CreateBundleComponent,AllOrdersComponent,AllProductsComponent,SettingsComponent, EditProductComponent, NewHomeComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    HttpModule,
    NgxLoadingModule,
    BsDatepickerModule.forRoot(),
    GooglePlaceModule
  ]
})
export class SupplierModule { }
