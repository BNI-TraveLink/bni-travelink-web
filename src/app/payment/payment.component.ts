import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stepper } from '../service/stepper.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit  {
  isValueUpdated: boolean = false
  isPaymentUpdated: boolean = false
  isComplete: boolean = false

  constructor(private stepper:Stepper) { 
  }

  ngOnInit(): void {
      this.stepper.getBooleanValue().subscribe(value =>{
        this.isValueUpdated = value
      })
      this.stepper.getisOrderValue().subscribe(value=>{
        this.isPaymentUpdated =value
      })
      this.stepper.getCompleteValue().subscribe(value=>{
        this.isComplete =value
      })
  }
}
