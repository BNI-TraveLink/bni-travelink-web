import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  // const document = inject(DOCUMENT)
  const token = localStorage.getItem('token')
  console.log(route);
  console.log(state);

  const router = inject(Router);
  console.log('I am in auth guard');
  // console.log(state);

  console.log("token", token)

  if(token){
    return true
  }
  else{
    router.navigate(['login'])
    return false;
  }
};
