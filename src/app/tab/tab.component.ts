// tab.component.ts

import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Init } from 'v8';
import { response } from 'express';
import { Station } from '../models/stations';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { FormKRLDataService } from '../service/form.krl.service';

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


  constructor(private homeService: HomeService, private router: Router, private formService: FormKRLDataService) { }
  ngOnInit() {
    this.homeService.getAllStation().subscribe(response => {
      console.log("Result" + response)
      this.stations = response
      this.destinationStation = response
    })

    this.departureControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.homeService.searchStation(value))
    ).subscribe((result) => {

      this.searchedStation = result.length > 0 ? result : [{ station_name: 'No result' }];
      this.isSearching = true;
    })

    this.destinationControl.valueChanges.pipe(debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.homeService.searchDestination(value))
    ).subscribe((result) => {
      this.searchedDestination = result.length > 0 ? result : [{ station_name: 'No result' }];
      this.isSearchingDestination = true;
    })

  }
  selectedStation(stations: Station) {
    console.log('Selected Station', stations)
    this.departureControl.setValue(stations.station_name)
    // this.destinationControl.setValue(stations.station_name)
    this.isSearching = false
  }

  navigateToPaymentMethod() {
    // Lakukan navigasi ke langkah PaymentMethodComponent
    this.router.navigate(['pay/confirm']);
  }

  selectedDestination(stations: Station) {
    console.log('Selected Station', stations)
    // this.departureControl.setValue(stations.station_name)
    this.destinationControl.setValue(stations.station_name)
    this.isSearchingDestination = false
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
      // Pilih stasiun pertama otomatis jika hasil pencarian tidak kosong
      if (this.searchedDestination.length > 0) {
        this.destinationControl.setValue(this.searchedDestination[0].station_name);
        // this.destinationControl.setValue(this.searchedDestination[0].station_name)
        this.isSearchingDestination = false;
        event.preventDefault(); // Sembunyikan hasil pencarian setelah Enter
      }
      else {
        this.destinationControl.setValue('');
      }
    }
  }


  formDataLondon: any = { username: '', password: '' };
  formDataParis: any = { username: '', password: '' };
  formDataTokyo: any = { username: '', password: '' };

  openCity(cityName: string): void {
    this.activeTab = cityName;
  }

  toggleStations(): void {
    const departureValue = this.departureControl.value;
    this.departureControl.setValue(this.destinationControl.value);
    this.destinationControl.setValue(departureValue);
  }


  navigateToPay() {
    // Lakukan navigasi ke langkah PaymentMethodComponent
    this.router.navigate(['/pay/confirm']);
  }

  submitForm(cityName: string): void {
    const formData = this.getFormData(cityName);
    console.log(`Form data for ${cityName}:`, formData);
    console.log(`form data submiteted`)
    this.formService.updateFormData(formData)
    this.navigateToPay()
    // Add your logic to send the form data to the server or handle it as needed
  }

  private getFormData(cityName: string): any {
    switch (cityName) {
      case 'KRL':
        return {
          departure: this.departureControl.value,
          destination: this.destinationControl.value,
          passangers: this.passengerCountControl.value
        };
      case 'Paris':
        return { ...this.formDataParis };
      case 'Tokyo':
        return { ...this.formDataTokyo };
      default:
        return {};
    }
  }
}
