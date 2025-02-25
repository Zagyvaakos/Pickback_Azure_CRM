import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    constructor(@Inject(DOCUMENT) private document: Document) {

    }
    public isDarkmode = signal(false);
    toggleDarkmode(optionalBoolean?: boolean) {
        if (optionalBoolean !== undefined) {
            localStorage.setItem('isDarkmode', optionalBoolean.toString())
            this.isDarkmode.set(optionalBoolean);
        } else {
            let currentState = localStorage.getItem('isDarkmode')
            let newDarkmode = false;
            switch (currentState) {
                case 'true':
                    newDarkmode = false
                    break
                case 'false':
                    newDarkmode = true
                    break
                default:
                    newDarkmode = false
                    break
            }
            localStorage.setItem('isDarkmode', newDarkmode.toString())

            this.isDarkmode.update((current) => !current);
            this.updateTheme(this.isDarkmode());



        }
    }



    initializeTheme(): void {
        const savedDarkmode = localStorage.getItem('isDarkmode') === 'true';
        this.isDarkmode.set(savedDarkmode);
        this.updateTheme(savedDarkmode);
    }
    private updateTheme(isDarkMode: boolean): void {
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }

    updateDeviceSizing(device: any) {
        const htmlElement = document.documentElement;
        if (device.isMobile) {
            document.body.classList.add('mobile');
            htmlElement.classList.add('mobile')
        }
        else if (device.isTablet) {
            htmlElement.classList.add('tablet')

            this.document.body.classList.add('tablet')
        }
        else { }

    }
}
