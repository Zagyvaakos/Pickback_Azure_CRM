import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AUTH_TOKEN_KEY } from './auth.config';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authTokenKey = inject(AUTH_TOKEN_KEY);
  const authReq: HttpRequest<unknown> = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem(authTokenKey)}`,
    },
  });
  return next(authReq);
};
