import { Inject, Injectable } from "@angular/core";
import axios from "axios";
import { Observable } from "rxjs";
import { Login } from "../models/login";

@Injectable({providedIn:'root'})
export class LoginService{
    private baseUrl = "http://localhost:8081/logins/hash";
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
                  console.log(data);
                  observer.next(data);
                  observer.complete();
              })
              .catch(error => {
                  observer.error(error);
                  console.error(error);
              });
      });}
}