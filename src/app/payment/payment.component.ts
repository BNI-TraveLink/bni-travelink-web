import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  currentStep: string = 'personal';
  activeColor: string = 'teal';

  steps: string[] = ['personal', 'account', 'message', 'confirm'];

  goToNextStep() {
    const currentIndex = this.steps.indexOf(this.currentStep);
    if (currentIndex < this.steps.length - 1) {
      this.currentStep = this.steps[currentIndex + 1];
      this.setActiveColor(); // Atur warna aktif setiap kali langkah berubah
    }
  }

  goToPreviousStep() {
    const currentIndex = this.steps.indexOf(this.currentStep);
    if (currentIndex > 0) {
      this.currentStep = this.steps[currentIndex - 1];
    }
  }

  setActiveColor() {
    switch (this.currentStep) {
      case 'personal':
        this.activeColor = 'teal';
        break;
      case 'account':
        this.activeColor = 'teal'; // Ganti dengan warna yang diinginkan untuk langkah ini
        break;
      case 'message':
        this.activeColor = 'teal'; // Ganti dengan warna yang diinginkan untuk langkah ini
        break;
      case 'confirm':
        this.activeColor = 'teal'; // Ganti dengan warna yang diinginkan untuk langkah ini
        break;
      default:
        break;
    }
  }
}
