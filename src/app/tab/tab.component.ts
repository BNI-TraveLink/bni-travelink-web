// tab.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  tabs = ['KRL', 'MRT', 'LRT', 'TJ'];
  activeTab: string = this.tabs[0];

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  // submitForm(form: any): void {
  //   // Proses formulir sesuai kebutuhan
  //   if (form.valid) {
  //     console.log('Form submitted:', form.value);
  //     // Lakukan tindakan formulir yang sesuai, misalnya, kirim data ke server
  //   }
  // }
}
