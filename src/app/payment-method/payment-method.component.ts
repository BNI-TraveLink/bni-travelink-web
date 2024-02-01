import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormKRLDataService } from '../service/form.krl.service';
import { delay, timer } from 'rxjs';
import { response } from 'express';
import { Stepper } from '../service/stepper.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})
export class PaymentMethodComponent implements OnInit{
  constructor(private route:ActivatedRoute, private router:Router, private service:FormKRLDataService, private stepper:Stepper ){}
  ngOnInit(): void {
  }

  completePayment(){
    const orderID : string|null = sessionStorage.getItem('orderID')
    const userID = localStorage.getItem('userID')
    const val = "+200"

    console.log(orderID, userID)

    this.service.updatePayment(orderID!, userID!, val).pipe(delay(3000)).subscribe((response)=>{
      console.log('Pesan',response)
    })
    this.service.getTicket(orderID!).subscribe(()=>{
      this.router.navigate(['/pay/complete'],{state:{currentStep:'complete'}})
      this.stepper.setisOrderValue(true)
      this.stepper.setCompleteValue(true)
      })
  }
  activeTab: number = 1;

  showTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
