import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { tapResponse } from '@ngrx/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginData } from '../models/login-data';
import { AUTH_TOKEN_KEY } from '../auth.config';
import { Validator } from '../../../@shared/models/Validator.model';

interface AuthState {
  isLoading: boolean;
  validators: Map<keyof LoginData, Validator>;
}
const initialState: AuthState = {
  isLoading: false,
  validators: new Map([
    ['email', { required: true }],
    ['password', { required: true }],
  ]),
};

export const AuthStore = signalStore(
  withState(initialState),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      authTokenKey = inject(AUTH_TOKEN_KEY),
      matSnackBar = inject(MatSnackBar),
      router = inject(Router)
    ) => ({
      setIsLoading(isLoading: boolean): void {
        patchState(store, () => ({ isLoading }));
      },
      login: rxMethod<LoginData>(
        pipe(
          tap(() => patchState(store, () => ({ isLoading: true }))),
          switchMap((loginData) => {
            return authService.login$(loginData).pipe(
              tap((token) => {
                console.log('Token received:', token); // Debug response
                localStorage.setItem(authTokenKey, token);
              }),
              tapResponse({
                next: () => {
                  setTimeout(() => {
                    matSnackBar.open('Sikeres bejelentkezés!', undefined, {
                      panelClass: 'success',
                      duration: 3000,

                    });
                  }, 300);

                  router.navigate(['/crm/home']);
                },
                error: (err) => {
                  setTimeout(() => {
                    matSnackBar.open('Sikertelen bejelentkezés!', undefined, {
                      panelClass: 'error',
                      duration: 3000,
                    });
                  }, 300);


                },
                finalize: () => {
                  patchState(store, () => ({ isLoading: false }));
                },
              })
            );
          })
        )
      ),
    })
  )
);