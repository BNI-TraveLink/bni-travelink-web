// tab.component.ts

import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Station } from '../models/stations';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, flatMap, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Stepper } from '../service/stepper.service';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  activeTab: string = 'KRL';
  title = "Halo"
  stations: Station[] = []
  destinationStation: Station[] = []

  isSearching: boolean = false;
  isSearchingDestination: boolean = false;

  searchedStation: any = []

  searchedDestination: any = []

  departureControl = new FormControl();
  destinationControl = new FormControl();
  passengerCountControl = new FormControl();

  passenger =''
  destination=''
  departure =''

  constructor(private homeService: HomeService, private router: Router, private stepper:Stepper) { }
  ngOnInit() {
    
    this.getStationByTab(this.activeTab)
    
    this.departureControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.homeService.searchStation(value)),
    ).subscribe((result) => {
      this.searchedStation = result.length > 0 ? result : [{ station_name: 'No result' }];
      this.isSearching = true;
    });
    
    this.destinationControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.homeService.searchDestination(value)),
    ).subscribe((result) => {
      this.searchedDestination = result.length > 0 ? result : [{ station_name: 'No result' }];
      this.isSearchingDestination = true;
    });

  }
  selectedStation(stations: Station) { 
    const selectedStation = stations.station_name
    if(selectedStation !== this.departureControl.value){
      this.departureControl.setValue(selectedStation)
      this.departure = this.departureControl.value
      this.isSearching = false
    }
  }

  selectedDestination(stations: Station) {
    this.destinationControl.setValue(stations.station_name)
    this.destination = this.destinationControl.value
    this.isSearchingDestination = false
  }

  handleDepartureFocus(): void {
    if (this.searchedStation.length > 0) {
      this.isSearching = true;
    } else {
      this.isSearching = false;
    }
  }
  
  handleDestinationFocus(): void {
    if (this.searchedDestination.length > 0) {
      this.isSearchingDestination = true;
    } else {
      this.isSearchingDestination = false;
    }
  }

  handleDepartureKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Pilih stasiun pertama otomatis jika hasil pencarian tidak kosong
      if (this.searchedStation.length > 0) {
        this.departureControl.setValue(this.searchedStation[0].station_name);
        // this.destinationControl.setValue(this.searchedDestination[0].station_name)
        this.isSearching = false;
        event.preventDefault(); // Sembunyikan hasil pencarian setelah Enter
      }
      else {
        this.departureControl.setValue('');
      }
    }
  }

  handleDestinationKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.searchedDestination.length > 0) {
        this.destinationControl.setValue(this.searchedDestination[0].station_name);
        this.isSearchingDestination = false;
        event.preventDefault(); // Sembunyikan hasil pencarian setelah Enter
      }
      else {
        this.destinationControl.setValue('');
        event.preventDefault();
      }
    }
  }


  openCity(cityName: string): void {
    this.activeTab = cityName;
    this.getStationByTab(cityName)

    this.departureControl.setValue('');
    this.destinationControl.setValue('');
    this.searchedDestination = [];
    this.searchedStation = [];

    this.isSearching = false;
    this.isSearchingDestination = false;
  }

  getStationByTab(cityName:string){
    this.homeService.getStationByServiceName(cityName).subscribe(response => {
      console.log("Result" + response)
      localStorage.setItem("tab",cityName)
      this.stations = response
      this.destinationStation = response
    })
  }

  toggleStations(): void {
    const departureValue = this.departureControl.value;
    this.departureControl.setValue(this.destinationControl.value);
    this.destinationControl.setValue(departureValue);
    this.searchedDestination =[]
    this.searchedStation =[]
  }

  submitForm(cityName: string): void {
    if(this.isFormValid()){
      this.passenger = this.passengerCountControl.value
      sessionStorage.setItem('departure', this.departure);
      sessionStorage.setItem('destination', this.destination);
      sessionStorage.setItem('passenger', this.passenger);
      sessionStorage.setItem('tab-select', cityName)

      this.stepper.setBooleanValue(true)
      this.stepper.setisOrderValue(false)
      this.stepper.setCompleteValue(false)

      if (this.departure === this.destination) {
        alert("Tujuan dan Asal tidak boleh sama");
        return;
      }
      this.navigateToPay()
      }
      else{
        console.log("Form is not valid. Please fill in all required fields.");
      }
  }

  // validasi form
  isFormValid():boolean{
    return(
      this.departureControl.valid && this.destinationControl.valid && this.passengerCountControl.valid
    )
  }

  
  navigateToPay() {

    this.router.navigateByUrl('/pay/confirm',{replaceUrl:true});
  }
}
