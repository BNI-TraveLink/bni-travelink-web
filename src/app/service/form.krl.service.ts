import { Injectable } from "@angular/core";
import axios from "axios";
import { error } from "console";
import { response } from "express";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable({providedIn:'root'})
export class FormKRLDataService{

    private baseUrl = "http://localhost:8081/payment/GeneratePayment"

    constructor(private loginService: LoginService){}

    formData = new BehaviorSubject<any>(null)
    formData$ = this.formData.asObservable()
    userId = this.loginService.getUserId()

    createPayment(userID:string, serviceName:string, departure:string, destination:string, amount:number, totalPrice:number):Observable<number>{
        
        const formDataSubmit = new FormData();
        formDataSubmit.append('userId', 'bambang');
        formDataSubmit.append('serviceName','KRL');
        formDataSubmit.append('departure', 'Depok');
        formDataSubmit.append('destination', 'Bogor');
        formDataSubmit.append('amount','3')
        formDataSubmit.append('totalPrice', '9000')
        return new Observable<number>(observe=>{
            console.log(formDataSubmit)
            // console.log(amount)
            // axios.post(this.baseUrl, formDataSubmit).then(response =>{
            //     const data = response.data.price
            //     console.log("response", data)
            //     observe.next(data)
            //     observe.complete()
            // }).catch( error=>
            //     observe.error(error)
            // )
        })
    }

    updateFormData(formData: any):void{
        this.formData.next(formData)
    }
}