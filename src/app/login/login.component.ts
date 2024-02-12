import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm?:any;
  showPassword: boolean = false;

  fontStyle:any ={}
  
  constructor(private fb:FormBuilder, private router:Router,private loginService:LoginService){}

  ngOnInit():void{
    this.loginForm = this.fb.group({
      userid:['', Validators.required],
      mpin: ['', Validators.required]
    })

  }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

  onSubmit():void{
    const useridField = this.loginForm.get('userid')
    const mpinField = this.loginForm.get('mpin')

    if(useridField && mpinField){
      if(useridField.invalid) {
        useridField.markAsTouched()
        return
      }
  
      if (mpinField.invalid) {
        mpinField.markAsTouched()
        return
      }

      const userId = useridField.value
      const mpin = mpinField.value

      this.loginService.loginByHash(userId,mpin).subscribe({
        next: (result) =>{
          // console.log(result.userId)
          this.router.navigateByUrl('',{replaceUrl:true})
        },
        error:(error)=>{
          // console.error(error)
          this.loginForm.setErrors({'incorrectLogin':true})
        }

      })
    }
  }

}
