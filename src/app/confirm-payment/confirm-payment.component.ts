import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormKRLDataService } from '../service/form.krl.service';
import { PriceService } from '../service/price.service';
import { response } from 'express';
import { Stepper } from '../service/stepper.service';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.scss'
})
export class ConfirmPaymentComponent implements OnInit {
  formData : any;
  price:any
  destination:string|null = null
  departure:string|null = null
  passanger:string|null = null
  total:number= 0

  userID:any


  ngOnInit(): void {

    this.destination = sessionStorage.getItem('destination')
    this.departure = sessionStorage.getItem('departure')
    this.passanger = sessionStorage.getItem('passenger')
    this.service.getPriceKRL().subscribe((data)=>{
      this.price = data
    })
   
  }

  constructor(private router:Router, private formDataService:FormKRLDataService, private service:PriceService, private stepper: Stepper){}

  getTotal():number{
    return this.price * Number(this.passanger);
  }
  onSubmit():void{
    const userID = localStorage.getItem("userID")
    this.total = this.price * Number(this.passanger)
    this.formDataService.createPayment(userID!, "KRL", this.departure!, this.destination!, this.passanger!, this.getTotal().toString()).subscribe((response)=>{
      console.log(response)
      this.router.navigate(['/pay/process'])
      this.stepper.setBooleanValue(true)
    })

  }
}
