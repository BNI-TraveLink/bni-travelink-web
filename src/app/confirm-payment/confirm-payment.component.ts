import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormKRLDataService } from '../service/form.krl.service';
import { PriceService } from '../service/price.service';
import { response } from 'express';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.scss'
})
export class ConfirmPaymentComponent implements OnInit {
  formData : any;
  price:any
  destination:string =''
  departure:string=''
  passanger:string=''
  total:number= 0

  userID:any

  constructor(private route:ActivatedRoute, private router:Router, private formDataService:FormKRLDataService, private service:PriceService){}
  ngOnInit(): void {
    this.formDataService.formData$.subscribe((formData)=>{
      this.formData = formData
      this.destination = this.formData.destination
      this.departure = this.formData.departure
      // this.departure = formData.departure
      this.passanger = this.formData.passanger
      console.log(this.destination)
      console.log('Received form data in result component:', formData);
    })
    this.service.getPriceKRL().subscribe((data)=>{
      this.price = data
    })
    this.userID=this.formDataService.userId
    console.log(this.userID)
  }

  navigateToProcess() {
    // Lakukan navigasi ke langkah PaymentMethodComponent
    this.router.navigate(['pay/process']);
  }

  onSubmit(){

  console.log(this.departure)
    this.total = this.price * Number(this.passanger)
    this.formDataService.createPayment(this.userID, "KRL", this.departure, this.destination, Number(this.passanger), this.total).subscribe(response=>{
      console.log(response)
      // this.navigateToProcess()
    })
  }
}
