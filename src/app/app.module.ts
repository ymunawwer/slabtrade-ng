import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';


import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule,NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

import { SupplierRegisterComponent } from './supplier/supplier-register/supplier-register.component';

import { AuthGuard } from './auth-guard.service';


import { CustomerModule } from './customer/customer.module';
import { SupplierModule } from './supplier/supplier.module';
import { AdminModule } from './admin/admin.module';
import { LoginRegisterComponent } from './login-register/login-register.component';
import {MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';

import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
// import { country_state_city } from 'country-state-city';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    // country_state_city,
    SupplierRegisterComponent,

    LoginRegisterComponent,
    
    
    






  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    BrowserAnimationsModule,
    // country_state_city,
    ReactiveFormsModule,
    NgbModule,
    CustomerModule,
    SupplierModule,
    AdminModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(10,49,99,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
  })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
