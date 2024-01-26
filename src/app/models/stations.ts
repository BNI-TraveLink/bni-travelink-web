
export class Station {
  skStation: string
  station_name: string
  fkService: FkService

  constructor(skStation:string, station_name:string, fkService:FkService){
    this.skStation = skStation
    this.station_name= station_name
    this.fkService = fkService
  }
}

export interface FkService {
  skService: string
  price: number
  name: string
}