import { HttpClient} from '@angular/common/http';
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
  http = inject(HttpClient)
  
  constructor(private fb:FormBuilder, private router:Router,private loginService:LoginService){}

  ngOnInit():void{
    this.loginForm = this.fb.group({
      userid:['', Validators.required],
      mpin:['', Validators.required]
    })
  }

  onSubmit():void{
    if(this.loginForm.valid){
      const userid = this.loginForm.get('userid').value
      const mpin = this.loginForm.get('mpin').value
      this.loginService.loginByHash(userid,mpin).subscribe(response =>{
        const data = response
        this.router.navigate(['home'])
      })
    }
  }

}
