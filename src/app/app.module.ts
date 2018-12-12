import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule,NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { SupplierRegisterComponent } from './supplier-register/supplier-register.component';
import { CartCustomerComponent } from './cart-customer/cart-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CustomerDashboardComponent,
    RegisterCustomerComponent,
    SupplierRegisterComponent,
    CartCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
