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

            // if (newDarkmode) {
            //     this.loadTheme('dark')
            // } else {
            //     this.loadTheme('light')
            // }


        }
    }


    // loadTheme(themeName: string) {
    //     const head = this.document.getElementsByTagName('head')[0];
    //     const themeSrc = this.document.getElementById('client-theme') as HTMLLinkElement;
    //     if (themeSrc) {
    //         themeSrc.href = `${themeName}.scss`
    //     }
    //     else {
    //         const style = this.document.createElement('link');
    //         style.id = 'client-theme';
    //         style.rel = 'stylesheet';
    //         style.href = `${themeName}.scss`
    //         head.appendChild(style)
    //     }
    // }

    initializeTheme(): void {
        const savedDarkmode = localStorage.getItem('isDarkmode') === 'true';
        this.isDarkmode.set(savedDarkmode);

        document.body.classList.add(savedDarkmode ? 'dark-theme' : 'light-theme');
    }
}
// document.body.classList.toggle('dark-theme', newDarkmode);
// document.body.classList.toggle('light-theme', !newDarkmode);