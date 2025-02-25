import { getState, patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { DestroyRef, inject, Injectable, model } from '@angular/core';

const initialState = {
    model: {
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    }
};

Injectable({
    providedIn: 'root'
})
export const DeviceStore = signalStore(
    withState(initialState),
    withComputed(({ model }) => ({
    })),
    withMethods((store,
        destroyRef = inject(DestroyRef)
    ) => {
        return {
            setDevice(value: any) {
                patchState(store, (state) => ({ model: { ...value } }));
            },
            getDevice() {
                const model = store.model();
                return model;
            }
        }
    })
);

