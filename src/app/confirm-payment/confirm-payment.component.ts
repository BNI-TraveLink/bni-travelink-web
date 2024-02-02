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

  isVissible:boolean = false


  ngOnInit(): void {

    this.destination = sessionStorage.getItem('destination')
    this.departure = sessionStorage.getItem('departure')
    this.passanger = sessionStorage.getItem('passenger')

    const activeTab = localStorage.getItem('tab')
    this.service.getPriceTiket(activeTab!).subscribe((data)=>{
      this.price = data
      console.log(data)
    })
   
  }

  constructor(private router:Router, private formDataService:FormKRLDataService, private service:PriceService, private stepper: Stepper){}

  getTotal():number{
    return this.price * Number(this.passanger);
  }
  onSubmit():void{
    const userID = localStorage.getItem("userID")
    const tab = sessionStorage.getItem("tab-select")
    this.total = this.price * Number(this.passanger)
    this.formDataService.createPayment(userID!, tab!, this.departure!, this.destination!, this.passanger!,this.getTotal().toString()).subscribe((response)=>{
      console.log(response)
      localStorage.setItem("total-pay", this.total.toString())
      this.router.navigateByUrl('/pay/process',{ replaceUrl: true })
      this.stepper.setisOrderValue(true)
    })

  }

  showPopUp(){
    this.isVissible = !this.isVissible
  }
}
