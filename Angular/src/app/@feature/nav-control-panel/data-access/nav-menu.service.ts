import { computed, Injectable, signal } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class NavMenuService {
    public expanded = signal(false);

    toggleMenu(optionalBoolean?: boolean) {
        if (optionalBoolean !== undefined) {
            this.expanded.set(optionalBoolean);
        } else {
            this.expanded.update((current) => !current);
        }
    }
}
