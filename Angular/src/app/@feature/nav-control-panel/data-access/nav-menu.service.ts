import { computed, Injectable, signal } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class NavMenuService {
    public expanded = signal(false);
    public activeMenu = signal('')

    toggleMenu(optionalBoolean?: boolean) {
        if (optionalBoolean !== undefined) {
            this.expanded.set(optionalBoolean);
            localStorage.setItem('menuState', this.expanded().toString())
        } else {
            this.expanded.update((current) => !current);
            localStorage.setItem('menuState', this.expanded().toString())

        }
    }
}
