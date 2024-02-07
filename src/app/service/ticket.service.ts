import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ticket } from "../models/ticket";
import { error } from "console";
import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../../environments/environment.development";

@Injectable({providedIn:'root'})
export class TicketService{

    
    showAllTicket(userID: string): Observable<Ticket[]>{
        // console.log(localStorage.getItem('token'))
        const token = localStorage.getItem('token')
        const config: AxiosRequestConfig = {
            headers: {
              Authorization :`Bearer ${token}`,
           }
           }
        return new Observable<Ticket[]>(observer =>{
            axios.get(`${environment.apiUrl}/transaction/userId/${userID}`, config).then(response=>{
                const data = response.data
                observer.next(data)
                observer.complete()
            }).catch(error =>{
                observer.error(error)
            })
        })
    }
}