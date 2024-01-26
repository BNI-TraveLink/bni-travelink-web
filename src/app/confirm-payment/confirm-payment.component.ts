import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.scss'
})
export class ConfirmPaymentComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
  }

  navigateToProcess() {
    // Lakukan navigasi ke langkah PaymentMethodComponent
    this.router.navigate(['pay/process']);
  }
}
