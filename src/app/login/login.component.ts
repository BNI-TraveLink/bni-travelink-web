import { HttpClient} from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm?:any;
  fontStyle:any ={}
  
  constructor(private fb:FormBuilder, private router:Router,private loginService:LoginService){}

  ngOnInit():void{
    this.loginForm = this.fb.group({
      userid:['', Validators.required],
      mpin: ['', [Validators.required, Validators.maxLength(6)]]
    })

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
          this.router.navigateByUrl('',{replaceUrl:true})
        },
        error:(error)=>{
          console.error(error)
          this.loginForm.setErrors({'incorrectLogin':true})
        }

      })
    }
  }

}
