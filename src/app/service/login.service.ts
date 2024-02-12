import { Injectable } from "@angular/core";
import axios from "axios";
import {Observable } from "rxjs";
import { Login } from "../models/login";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({providedIn:'root'})
export class LoginService{
    login:any

    constructor(private router:Router){}
    
    loginByHash(userId: string, mpin: string): Observable<Login> {
        // Creating FormData object
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('mpin', mpin);
    
        // Using Axios for the HTTP request with form data
        return new Observable<Login>(observer => {
          axios.post<Login>(`${environment.apiUrl}/logins/hash`, formData)
              .then(response => {
                  const data = response.data; // Extract the required fields
                  this.login = data

                  localStorage.setItem('userID', this.login.userId)
                  localStorage.setItem('token',this.login.jwt)

                  observer.next(data);
                  observer.complete();
              })
              .catch(error => {
                  observer.error(error);
                  console.error("Gagal Login");
              });
              
      });}

    getToken(){
        return localStorage.getItem('token');
    }

    getUserId(){
        return localStorage.getItem('userID');
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