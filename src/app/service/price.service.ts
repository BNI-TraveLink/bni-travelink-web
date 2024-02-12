import { Injectable } from "@angular/core";
import axios, { AxiosRequestConfig } from "axios";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({providedIn:'root'})
export class PriceService{

    constructor(){}

    token = localStorage.getItem('token')

    getPriceTiket(tab:String):Observable<number>{
        const config: AxiosRequestConfig = {
            headers: {
              Authorization :`Bearer ${this.token}`,
           }
           }
        return new Observable<number>(observe=>{
            axios.get(`${environment.apiUrl}/service/getServiceByName/${tab}`,config).then(response=>{
                const data = response.data.price
                observe.next(data)
                observe.complete()
            }
            ).catch( error=>
                observe.error(error)
            )
        })

    }
 
}