import { Inject, inject} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,Router,RouterStateSnapshot,UrlTree} from '@angular/router';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn | UrlTree = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree =>{
  const loginService = inject(LoginService)
  const router = inject(Router)

  const userLoginStatus = loginService.getToken()
  
  if (userLoginStatus ) {
    return true
  }
  else {
    return router.createUrlTree(['login']);
  }

} 



