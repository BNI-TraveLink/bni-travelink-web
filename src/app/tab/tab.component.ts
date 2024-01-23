// tab.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  activeTab: string = 'London';
  title = "Halo"

  formDataLondon: any = { username: '', password: '' };
  formDataParis: any = { username: '', password: '' };
  formDataTokyo: any = { username: '', password: '' };

  openCity(cityName: string): void {
    this.activeTab = cityName;
  }

  submitForm(cityName: string): void {
    const formData = this.getFormData(cityName);
    console.log(`Form data for ${cityName}:`, formData);
    // Add your logic to send the form data to the server or handle it as needed
  }

  private getFormData(cityName: string): any {
    switch (cityName) {
      case 'London':
        return { ...this.formDataLondon };
      case 'Paris':
        return { ...this.formDataParis };
      case 'Tokyo':
        return { ...this.formDataTokyo };
      default:
        return {};
    }
  }
}
