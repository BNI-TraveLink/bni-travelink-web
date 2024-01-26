import { Observable, of } from "rxjs";
import { Station } from "../models/stations";
import axios from "axios";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class HomeService{
    private baseUrl = "http://localhost:8081/stations";

    stations :Station[] = []
    constructor(){}

    //get semua station
    getAllStation():Observable<Station[]>{
        return new Observable<Station[]>(observeable =>{
            axios.get<Station[]>(this.baseUrl).then(response =>{
                const data = response.data
                this.stations = data
                console.log(data)
                observeable.next(data)
                observeable.complete()
            })
            .catch(error =>{
                observeable.error(error)
            })
        })
    }

    searchStation(query: string): Observable<Station[]> {
        const filteredStations = this.stations.filter((station) =>
          station.station_name.toLowerCase().includes(query.toLowerCase())
        );
        return of(filteredStations);
      }

      searchDestination(query: string): Observable<Station[]> {
        const filteredStations = this.stations.filter((station) =>
          station.station_name.toLowerCase().includes(query.toLowerCase())
        );
        return of(filteredStations);
      }

}