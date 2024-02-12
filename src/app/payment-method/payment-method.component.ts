import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormKRLDataService } from '../service/form.krl.service';
import { delay, finalize} from 'rxjs';
import { Stepper } from '../service/stepper.service';
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})
export class PaymentMethodComponent implements OnInit{
  loading : boolean= false
  activeTab: number = 1;
  constructor(private route:ActivatedRoute, private router:Router, private service:FormKRLDataService, private stepper:Stepper ){}
  ngOnInit(): void {
  }

  completePayment(){
    this.loading = true
    const orderID = sessionStorage.getItem('orderID')
    const userID = localStorage.getItem('userID')
    const val = `-${localStorage.getItem('total-pay')}`

    const paymentProcess = new Promise<void>((resolve, reject)=>{
      this.service.updatePayment(orderID!, userID!, val).subscribe({
        next:(response)=>{
          console.log('Pesan',response)
          resolve()
        },error:(error)=>{
          reject(error)
        }
      })
      this.service.getTicket(orderID!).subscribe({
        next:(response) =>{
          console.log('Pesan',response)
        },
        error:(error)=>{
          console.log('Error', error)
          reject(error)
        }
      })
    })

    paymentProcess.then(()=>{
      setTimeout(()=>{
        this.loading = false
        this.router.navigateByUrl('/pay/complete', { state: { currentStep: 'complete' }, replaceUrl: true })
        this.stepper.setCompleteValue(true)
      },5000)
    }).catch((error)=>{
      console.error()
      this.loading = false
    })
  }
  showTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
