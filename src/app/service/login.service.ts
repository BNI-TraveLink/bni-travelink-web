import { Inject, Injectable } from "@angular/core";
import axios from "axios";
import { BehaviorSubject, Observable } from "rxjs";
import { Login } from "../models/login";

@Injectable({providedIn:'root'})
export class LoginService{
    
    private baseUrl = "http://localhost:8081/logins/hash";
    login:any
    private _isLoggedIn = new BehaviorSubject<boolean>(false)
    isLoggedIn$= this._isLoggedIn.asObservable();
    token:String=''


    getToken(){
        return localStorage.getItem('token')
    }

    getUserId(){
        return localStorage.getItem('userID')
    }


    constructor(){}
    
    loginByHash(userId: string, mpin: string): Observable<Login> {
        // Creating FormData object
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('mpin', mpin);
    
        // Using Axios for the HTTP request with form data
        return new Observable<Login>(observer => {
          axios.post<Login>(this.baseUrl, formData)
              .then(response => {
                  const data = response.data; // Extract the required fields
                  this.login = data

                  console.log(data)
                  localStorage.setItem('userID',this.login.userId)
                  localStorage.setItem('token',this.login.jwt)

                  this._isLoggedIn.next(true)

                  console.log(this.login.userId);
                  observer.next(data);
                  observer.complete();
              })
              .catch(error => {
                 this._isLoggedIn.next(false)
                  observer.error(error);
                  console.error(error);
              });
      });}
}