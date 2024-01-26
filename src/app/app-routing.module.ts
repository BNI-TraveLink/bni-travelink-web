import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';
import { MyorderComponent } from './myorder/myorder.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmPaymentComponent } from './confirm-payment/confirm-payment.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { CompleteComponent } from './complete/complete.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/login'},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[authGuard]},
  {path:'pay', component:PaymentComponent,children:[
    {path:'confirm', component:ConfirmPaymentComponent},
    {path:'process', component:PaymentMethodComponent},
    {path:'complete', component:CompleteComponent}
  ], canActivate:[authGuard]},
  {path:'myorder', component:MyorderComponent, canActivate:[authGuard]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
