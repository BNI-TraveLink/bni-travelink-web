import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})
export class PaymentMethodComponent implements OnInit{
  constructor(private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
  }

  completePayment(){
    this.router.navigate(['/pay/complete'],{state:{currentStep:'complete'}});
  }
  activeTab: number = 1;

  showTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
