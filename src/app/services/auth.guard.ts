import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { LocalStorageService } from '../local-storage.service';


export const authGuard: CanActivateFn = (route, state) => {

  // const document = inject(DOCUMENT)
  const localStorages = inject(LocalStorageService)
  const token = localStorages.getItem('token')
  console.log(route);
  console.log(state);

  const router = inject(Router);
  console.log('I am in auth guard');
  // console.log(state);

  console.log("token", token)

  if(token){
    // router.navigate(['home'])
    return true
  }
  else{
    router.navigate(['login'])
    return false;
  }
};