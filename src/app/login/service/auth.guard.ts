import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class AuthGuard{
    constructor(private authService: AuthService, private router:Router){}

    canActivate():boolean{
        if(this.authService.isAuthenticatedUser()){
            return true
        }
        else{
            this.router.navigate(['/login'])
            return false;
        }
    }

}