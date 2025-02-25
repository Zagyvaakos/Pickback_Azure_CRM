
import { patchState, signalStoreFeature, type, withHooks } from '@ngrx/signals';
import { DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function withActivatedRouteData() {
  return signalStoreFeature(
    { state: type<any>() },
    withHooks({
      onInit: (
        store,
        activatedRoute = inject(ActivatedRoute),
        destroyRef = inject(DestroyRef)
      ) => {
        activatedRoute.data
          .pipe(
            tapResponse({
              next: (result) => {
                patchState(store, (state) => ({
                  ...state,
                  ...result['data'],
                }));
              },
              error: () => { },
            }),
            takeUntilDestroyed(destroyRef)
          )
          .subscribe();
      },
    })
  );
}
