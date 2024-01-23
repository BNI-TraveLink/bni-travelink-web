import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabComponent } from './tab/tab.component';
import { ConfirmPaymentComponent } from './confirm-payment/confirm-payment.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { CompleteComponent } from './complete/complete.component';
import { LoadingProcessComponent } from './loading-process/loading-process.component';
import { MyorderComponent } from './myorder/myorder.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PaymentComponent,
    NavbarComponent,
    TabComponent,
    ConfirmPaymentComponent,
    PaymentMethodComponent,
    CompleteComponent,
    LoadingProcessComponent,
    MyorderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
