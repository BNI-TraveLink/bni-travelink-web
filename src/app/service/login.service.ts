import { Injectable } from "@angular/core";
import axios from "axios";
import {Observable } from "rxjs";
import { Login } from "../models/login";
import { Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class LoginService{
    
    private baseUrl = "http://localhost:8081/logins/hash";
    login:any

    constructor(private router:Router){}
    
    loginByHash(userId: string, mpin: string): Observable<Login> {
        // Creating FormData object
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('mpin', mpin);

        console.log("Login",formData)
    
        // Using Axios for the HTTP request with form data
        return new Observable<Login>(observer => {
          axios.post<Login>(this.baseUrl, formData)
              .then(response => {
                  const data = response.data; // Extract the required fields
                  this.login = data

                  localStorage.setItem('userID',this.login.userId)
                  localStorage.setItem('token',this.login.jwt)

                //   this._isLoggedIn.next(true)

                console.log("Data", data)

                  observer.next(data);
                  observer.complete();
              })
              .catch(error => {
                //  this._isLoggedIn.next(false)
                  observer.error(error);
                  console.error(error);
              });
              
      });}

    getToken(){
        return localStorage.getItem('token') || '';
    }

    getUserId(){
        return localStorage.getItem('userID') || '';
    }


    isLoggedIn():boolean{
        const token = this.getToken()
        return !!token;
    }

    logout(){
        localStorage.removeItem('userID'),
        localStorage.removeItem('token')
        this.router.navigate(['login'])
        
    }
}