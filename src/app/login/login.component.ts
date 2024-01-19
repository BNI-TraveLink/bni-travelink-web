import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router){
    this.loginForm = this.formBuilder.group({
      userID : [''],
      mpin:['']
    })
  }

  onSubmit(): void{
    const userID = this.loginForm.get('userID')?.value
    const mpin = this.loginForm.get('mpin')?.value
    console.log('Form submitted!');
    console.log(this.loginForm.value);


    if(this.authService.login(userID, mpin)){
      this.router.navigate(['home'])
    }
    else{
      this.router.navigate(['login'])
    }
  }

}
