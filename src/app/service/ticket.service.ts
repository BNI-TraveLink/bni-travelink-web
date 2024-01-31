import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ticket } from "../models/ticket";
import { error } from "console";
import axios from "axios";
import { environment } from "../../environments/environment.development";

@Injectable({providedIn:'root'})
export class TicketService{
    
    showAllTicket(userID: string): Observable<Ticket[]>{
        return new Observable<Ticket[]>(observer =>{
            axios.get(`${environment.apiUrl}/transaction/userId/${userID}`).then(response=>{
                const data = response.data
                observer.next(data)
                observer.complete()
            }).catch(error =>{
                observer.error(error)
            })
        })
    }
}