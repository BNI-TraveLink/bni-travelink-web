// tab.component.ts

import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Station } from '../models/stations';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Stepper } from '../service/stepper.service';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  activeTab: string = 'KRL';
  stations: Station[] = []
  destinationStation: Station[] = []

  isSearching: boolean = false;
  isSearchingDestination: boolean = false;

  searchedStation: Station[] = []

  searchedDestination: Station[] = []

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
    this.activeTab = cityName;
    console.log(this.activeTab)
    this.getStationByTab(cityName)
  }

  getStationByTab(cityName: string) {

    console.log('getStationByTab called for:', cityName);

    this.searchedStation = [];
    this.searchedDestination = [];

    this.homeService.getStationByServiceName(cityName).subscribe(response => {
      console.log("Result" + response)
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
      sessionStorage.setItem('tab-select', cityName)
      
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
      console.log("Form is not valid. Please fill in all required fields.");
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
    this.router.navigateByUrl('/pay/confirm', { replaceUrl: true });
  }
}
