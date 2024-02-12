import { Injectable } from "@angular/core";
import axios from "axios";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginService } from "./login.service";
import { Ticket } from "../models/ticket";
import { error } from "console";
import { environment } from "../../environments/environment";
import { response } from "express";

@Injectable({providedIn:'root'})
export class FormKRLDataService{

    constructor(private loginService: LoginService){}

    formData = new BehaviorSubject<any>(null)
    formData$ = this.formData.asObservable()
    userId = this.loginService.getUserId()

    token = localStorage.getItem('token')

    headers = {
        Authorization :`Bearer ${this.token}`,
     }

    createPayment(userID:string, serviceName:string, departure:string, destination:string, amount:string, totalPrice:string):Observable<number>{
        
        const formDataSubmit = new FormData();
        formDataSubmit.append('userId', userID);
        formDataSubmit.append('serviceName',serviceName);
        formDataSubmit.append('departure', departure);
        formDataSubmit.append('destination', destination);
        formDataSubmit.append('amount',amount)
        formDataSubmit.append('totalPrice', totalPrice)

        return new Observable<number>(observe=>{
            axios.post<number>(`${environment.apiUrl}/payment/GeneratePayment`, formDataSubmit, {headers: this.headers}).then(response =>{
                const data = response.data
                sessionStorage.setItem("orderID", data.toString())
                observe.next(data)
                observe.complete()
            }).catch( error=>
                observe.error(error)
            )
        })
    }

    updateFormData(formData: any):void{
        this.formData.next(formData)
    }

    //generate Ticket
    getTicket(orderID:String):Observable<Ticket>{ 
        return new Observable<Ticket>(observe=>{
            axios.post<Ticket>(`${environment.apiUrl}/tickets/GenerateTicket/${orderID}`,null,{headers: this.headers}).then(response=>{
                const data = response.data;
                observe.next(data)
                    observe.complete()
            }).catch(error =>{
                observe.error(error)
            })
        })
    }

    //Proses pelunasan
    updatePayment(orderID:string, userID:string, val:string):Observable<string>{
        const formUpdatePay = new FormData();
        formUpdatePay.append('orderId', orderID);
        formUpdatePay.append('userid',userID);
        formUpdatePay.append('val', val);

        return new Observable<string>(observe =>{
            axios.post<string>(`${environment.apiUrl}/payment/updatePayment`,formUpdatePay, {headers: this.headers}).then(response =>{
                const message = response.data
                console.log(message)                
                observe.next(message)
                observe.complete()
            }).catch(error =>{
                console.log(error.message)
                observe.error(error)
            })
        })
    }
}