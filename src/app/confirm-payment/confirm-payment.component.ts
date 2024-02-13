import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormKRLDataService } from '../service/form.krl.service';
import { PriceService } from '../service/price.service';
import { Stepper } from '../service/stepper.service';
import { DatePipe } from '@angular/common';

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

  harga:any

  isVissible:boolean = false

  selectedTerms: string[] = [];

  tnc = [
    {
      service_name: 'KRL',
      term_and_condition:[
        "1.Commuter Line ticket orders via BNI TraveLink are available for travel by Kereta Commuter Indonesia (KCI) or Commuter Line.",
        "2.Users must have a BNI account to order tickets via BNI TraveLink.",
        "3.Commuter Line ticket users must comply with the applicable regulations during the trip, including security rules and regulations that have been established.",
        "4.We have the right to cancel or refuse Commuter Line ticket orders if there are indications of fraud or violation of the terms and conditions specified.",
        "5.Departure station and destination station cannot be changed.",
        "6.Tickets that have been ordered cannot be cancelled.",
        "7.Commuter Line ticket users must exit at the destination station they have booked, otherwise the QR code cannot be used."
      ]
    },
    {
      service_name: 'MRT',
      term_and_condition:[
        "1.MRT ticket orders via BNI TraveLink are available for travel by Mass Rapid Transit Jakarta.",
        "2.Users must have a BNI account to order tickets via BNI TraveLink.",
        "3.MRT ticket users must comply with the applicable regulations during the trip, including security rules and regulations that have been established.",
        "4.We have the right to cancel or refuse MRT ticket orders if there are indications of fraud or violation of the terms and conditions specified.",
        "5.Departure station and destination station cannot be changed.",
        "6.Tickets that have been ordered cannot be cancelled.",
        "7.MRT ticket users must exit at the destination station they have booked, otherwise the QR code cannot be used."
      ]
    },
    {
      service_name: 'LRT',
      term_and_condition:[
        "1.LRT ticket orders via BNI TraveLink are available for travel by Light Rail Transit Jakarta.",
        "2.Users must have a BNI account to order tickets via BNI TraveLink.",
        "3.LRT ticket users must comply with the applicable regulations during the trip, including security rules and regulations that have been established.",
        "4.We have the right to cancel or refuse LRT ticket orders if there are indications of fraud or violation of the terms and conditions specified.",
        "5.Departure station and destination station cannot be changed.",
        "6.Tickets that have been ordered cannot be cancelled.",
        "7.LRT ticket users must exit at the destination station they have booked, otherwise the QR code cannot be used."
      ]
    },
    {
      service_name: 'TJ',
      term_and_condition:[
        "1.TiJe ticket orders via BNI TraveLink are available for travel by Bus Rapid Transit (BRT) Jakarta.",
        "2.Users must have a BNI account to order tickets via BNI TraveLink.",
        "3.TiJe ticket users must comply with the applicable regulations during the trip, including security rules and regulations that have been established.",
        "4.We have the right to cancel or refuse TiJe ticket orders if there are indications of fraud or violation of the terms and conditions specified.",
        "5.Departure station and destination station cannot be changed.",
        "6.Tickets that have been ordered cannot be cancelled.",
        "7.TiJe ticket users must exit at the destination bus stop they have booked, otherwise the QR code cannot be used."
      ]
    }

  ]

  ngOnInit(): void {

    this.destination = sessionStorage.getItem('destination')
    this.departure = sessionStorage.getItem('departure')
    this.passanger = sessionStorage.getItem('passenger')

    const activeTab = localStorage.getItem('tab')

    this.getTodayDate()
    
    this.showTerms(activeTab!)
    this.service.getPriceTiket(activeTab!).subscribe((data)=>{
      this.price = data
    })   
  }

  transform(value: number): string {
    if (value) {
      // Convert the number to string and split it to add separators
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return '';
  }

  

  constructor(private router:Router, private formDataService:FormKRLDataService, private service:PriceService, private stepper: Stepper, private datePiper: DatePipe){}

  getTotal():number{
    return this.price * Number(this.passanger);
  }

  showTerms(serviceName: string): void {
    const selectedService = this.tnc.find(service => service.service_name === serviceName);
    if (selectedService) {
        this.selectedTerms = selectedService.term_and_condition;
    } else {
        this.selectedTerms = []; // Reset selected terms if service not found
    }
}

  onSubmit():void{
    const userID = localStorage.getItem("userID")
    const tab = sessionStorage.getItem("tab-select")
    console.log('Tab Select', tab)

    this.total = this.price * Number(this.passanger)
    this.formDataService.createPayment(userID!, tab!, this.departure!, this.destination!, this.passanger!,this.getTotal().toString()).subscribe((response)=>{
      localStorage.setItem("total-pay", this.total.toString())
      this.router.navigateByUrl('/pay/process',{ replaceUrl: true })
      this.stepper.setisOrderValue(true)
    })

  }

  //dapat tanggal hari ini
  getTodayDate(){
    const today = new Date()
    const endOfDayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23,59)
    const todayFormat = this.datePiper.transform(endOfDayDate, 'dd MMMM yyy HH:mm')
    return todayFormat;
  }

  showPopUp(){
    this.isVissible = !this.isVissible
  }
}
