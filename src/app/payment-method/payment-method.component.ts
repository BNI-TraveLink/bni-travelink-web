import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormKRLDataService } from '../service/form.krl.service';
import { delay} from 'rxjs';
import { Stepper } from '../service/stepper.service';

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

    this.service.updatePayment(orderID!, userID!, val).pipe(delay(5000)).subscribe((response)=>{
      console.log('Pesan',response)
      this.loading = false
    })
    this.service.getTicket(orderID!).subscribe(()=>{
      this.router.navigateByUrl('/pay/complete',{state:{currentStep:'complete'}, replaceUrl:true})
      this.stepper.setCompleteValue(true)
      this.loading = false
      })
  }
  showTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
