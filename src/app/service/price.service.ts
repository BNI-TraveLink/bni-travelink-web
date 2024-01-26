import { Injectable } from "@angular/core";
import axios from "axios";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class PriceService{
    private baseUrl = "http://localhost:8081/service/getServiceByName/krl";
    constructor(){}

    getPriceKRL():Observable<number>{
        return new Observable<number>(observe=>{
            axios.get(this.baseUrl).then(response=>{
                const data = response.data.price
                console.log("response", data)
                observe.next(data)
                observe.complete()
            }
            ).catch( error=>
                observe.error(error)
            )
        })

    }
 
}