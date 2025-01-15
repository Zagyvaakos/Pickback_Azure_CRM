import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH_TOKEN_KEY } from './auth.config';



export const authGuard: CanActivateFn = () => {
  const authTokenKey = inject(AUTH_TOKEN_KEY);
  const router = inject(Router);

  const token = localStorage.getItem(authTokenKey);
  if (token != null) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};