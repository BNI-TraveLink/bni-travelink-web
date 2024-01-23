import { Injectable } from "@angular/core"

@Injectable({
    providedIn:'root'
})
export class AuthService{
    private isAuthenticated = false

    login(userID:string, mpin: number):boolean{
        this.isAuthenticated = userID === "Gaming46" && mpin==12348
        return this.isAuthenticated
    }
    logout():void{
        this.isAuthenticated = false
    }
    isAuthenticatedUser():boolean{
        return this.isAuthenticated
    }
}