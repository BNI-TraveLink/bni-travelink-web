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
  http = inject(HttpClient)
  fontStyle:any ={}
  
  constructor(private fb:FormBuilder, private router:Router,private loginService:LoginService){}

  ngOnInit():void{
    this.loginForm = this.fb.group({
      userid:['', Validators.required],
      mpin:['', Validators.required]
    })

  }

  onSubmit():void{
    const useridField = this.loginForm.get('userid')
    const mpinField = this.loginForm.get('mpin')

    if(useridField && mpinField){
      if(useridField.invalid) {
        useridField.markAsTouched(); // Menandai input sebagai "touched" untuk menunjukkan pesan kesalahan
        return; // Menghentikan eksekusi jika input belum valid
      }
  
      if (mpinField.invalid) {
        mpinField.markAsTouched(); // Menandai input sebagai "touched" untuk menunjukkan pesan kesalahan
        return; // Menghentikan eksekusi jika input belum valid
      }

      const userId = useridField.value
      const mpin = mpinField.value

      this.loginService.loginByHash(userId,mpin).subscribe({
        next: (result) =>{
          console.log(result.userId)
          this.router.navigate([''])
        },
        error:(error)=>{
          console.error(error)
          this.loginForm.setErrors({'incorrectLogin':true})
        }

      })
    }
  }

}
