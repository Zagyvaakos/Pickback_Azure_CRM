import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {

    public isLoading = signal(false);

    constructor() { }

    toggleLoading(optionalBoolean?: boolean) {
        if (optionalBoolean !== undefined) {
            this.isLoading.set(optionalBoolean);
        } else {
            this.isLoading.set(false)
        }
    }
}