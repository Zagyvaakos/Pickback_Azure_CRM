import { InjectionToken } from '@angular/core';

export const AUTH_TOKEN_KEY = new InjectionToken<string>('AuthTokenKey', {
  providedIn: 'root',
  factory: () => 'AUTH_TOKEN',
});
