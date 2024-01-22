import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  currentStep: string = 'personal';
  steps: string[] = ['personal', 'account', 'message'];

  nextStep() {
    const currentIndex = this.steps.indexOf(this.currentStep);

    if (currentIndex < this.steps.length - 1) {
      this.currentStep = this.steps[currentIndex + 1];
    } else {
      // Optionally, you can handle what happens when reaching the last step
      // For now, let's loop back to the first step
      this.currentStep = this.steps[0];
    }
  }
}
