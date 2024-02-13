// tab.component.ts

import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Station } from '../models/stations';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Stepper } from '../service/stepper.service';
import { strict } from 'assert';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  activeTab: string = 'KRL'
  stations: Station[] = []
  destinationStation: Station[] = []

  isSearching: boolean = false
  isSearchingDestination: boolean = false

  isVisible: boolean = false

  searchedStation: Station[] = []

  searchedDestination: Station[] = []

  mapImagePath: string ='';

  departureControl :any;
  destinationControl : any;
  passengerCountControl:any;


  constructor(private homeService: HomeService, private router: Router, private stepper: Stepper) {}  
  
  ngOnInit() {
  
  this.departureControl = new FormControl('')
  this.destinationControl = new FormControl('')
  this.passengerCountControl = new FormControl('')

   this.openCity(this.activeTab)
  }

  openCity(cityName: string): void {
    
    this.departureControl.setValue('')
    this.destinationControl.setValue('')
    this.passengerCountControl.setValue('')

    this.activeTab = cityName;
    this.getStationByTab(cityName)
  }

  getStationByTab(cityName: string) {
    this.searchedStation = [];
    this.searchedDestination = [];

    this.homeService.getStationByServiceName(cityName).subscribe(response => {
      localStorage.setItem("tab", cityName)      
      this.stations = response
      this.destinationStation = response
    })
  }

  toggleStations(): void {
    const departureValue = this.departureControl.value;
    this.departureControl.setValue(this.destinationControl.value, {emitEvent:false});
    this.destinationControl.setValue(departureValue, {emitEvent:false});
    this.isSearching = false
    this.isSearchingDestination = false
  }

  submitForm(cityName: string): void {
    
    if (this.isFormValid()) {
      const passenger = this.passengerCountControl.value
      const departure = this.departureControl.value
      const destination = this.destinationControl.value

      sessionStorage.setItem('departure', departure!);
      sessionStorage.setItem('destination', destination!);
      sessionStorage.setItem('passenger', passenger!);
      sessionStorage.setItem('tab-select', cityName);

      if (departure === destination) {
        alert("Please select different destination");
        return;
      }

      if(departure == "" && destination ==""){
        alert("Please, Select your destination");
        return;
      }

      this.navigateToPay()
    }
    else {
      alert("Invalid Input")
    }
  }

  isFormValid(): boolean {
    return (
      this.departureControl.valid && this.destinationControl.valid && this.passengerCountControl.valid
    )
  }


  navigateToPay() {
    this.stepper.setBooleanValue(true)
    this.stepper.setisOrderValue(false)
    this.stepper.setCompleteValue(false)
    // this.router.navigateByUrl('/pay/confirm', { replaceUrl: true });
    this.router.navigate(['/pay/confirm']);
  }

  showMap(serviceName: string):string{
    switch(serviceName) {
      case 'KRL':
        return '/assets/images/rutekrl.png';
      case 'TJ':
        return '/assets/images/rutetransjakarta.png';
      case 'LRT':
        return '/assets/images/rutelrt.png';
      case 'MRT':
        return '/assets/images/rutemrt.png';
      default:
        return '/assets/images/rutekrl.png';
    }
  }

  openMap(tab:string):void{
    this.mapImagePath= this.showMap(tab)
    this.isVisible =!this.isVisible
  }

  closeMap(){
    return this.isVisible =!this.isVisible
  }
}
