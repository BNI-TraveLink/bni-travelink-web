import { Injectable } from "@angular/core";
import axios from "axios";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginService } from "./login.service";
import { Ticket } from "../models/ticket";
import { error } from "console";

@Injectable({providedIn:'root'})
export class FormKRLDataService{

    private baseUrl = "http://localhost:8081/payment/GeneratePayment"
    private baseUrlTicket = "http://localhost:8081/tickets/GenerateTicket"

    constructor(private loginService: LoginService){}

    formData = new BehaviorSubject<any>(null)
    formData$ = this.formData.asObservable()
    userId = this.loginService.getUserId()

    createPayment(userID:string, serviceName:string, departure:string, destination:string, amount:string, totalPrice:string):Observable<number>{
        
        const formDataSubmit = new FormData();
        formDataSubmit.append('userId', userID);
        formDataSubmit.append('serviceName',serviceName);
        formDataSubmit.append('departure', departure);
        formDataSubmit.append('destination', destination);
        formDataSubmit.append('amount',amount)
        formDataSubmit.append('totalPrice', totalPrice)

        console.log("Data",formDataSubmit)
        console.log("departure",departure)
    
        return new Observable<number>(observe=>{
         
            // console.log(amount)
            axios.post<number>(this.baseUrl, formDataSubmit, {headers:{'Content-Type':'multipart/form-data'}}).then(response =>{
                const data = response.data
                // console.log("response", data)
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

    //generate Tickete
    getTicket(orderID:String):Observable<Ticket>{
        return new Observable<Ticket>(observe=>{
            axios.post<Ticket>(`${this.baseUrlTicket}/${orderID}`).then(response=>{
                if(response.status === 200){
                    const data = response.data;
                    observe.next(data)
                    observe.complete()
                }  
            }).catch(error =>{
                observe.error(error)
            })
        })
    }
}