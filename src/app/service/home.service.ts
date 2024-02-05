import { Observable, of } from "rxjs";
import { Station } from "../models/stations";
import axios from "axios";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({providedIn:'root'})
export class HomeService{
    stations :Station[] = []
    constructor(){}

    getStationByServiceName(tab:string):Observable<Station[]>{
      const token = localStorage.getItem('token')
      console.log('token', token)
      return new Observable<Station[]>(observeable =>{
        const params ={
          serviceName:tab
        }
        axios.get<Station[]>(`${environment.apiUrl}/service/getStationByServiceName`, {params: params}).then(response =>{
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