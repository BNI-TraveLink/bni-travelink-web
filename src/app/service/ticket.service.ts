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
            axios.get(`${environment.apiUrl}/tickets/getTicketsByUserId/${userID}`).then(response=>{
                if(response.status === 200){
                    const data = response.data
                    observer.next(data)
                    observer.complete()
                }
                else{
                    observer.closed
                }
            }).catch(error =>{
                observer.error(error)
            })
        })
    }
}