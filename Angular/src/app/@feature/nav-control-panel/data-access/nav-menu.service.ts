import { computed, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class NavMenuService {
    public expanded = signal(false);
    public activeMenu = signal('')

    public name = signal('')
    public grouptext = signal('')
    public currentActiveRouteLinks = signal<any>([])
    constructor(private router: Router) { }

    public routeTaskLinks: any[] = [
        { link: 'crm/alltasks', name: 'Összes feladat', isActive: false, queryParams: { status: 'active' } },
        { link: 'crm/tasks', name: 'Aktív felatadok', isActive: false },
        { link: 'crm/tasks', name: 'Saját feladataim', isActive: false },
        { link: 'crm/tasks', name: 'Megosztott feladatok', isActive: false },
        { link: 'crm/examples', name: 'Példa store', isActive: false },
        { link: 'crm/home', name: 'Otthon e', isActive: false },
    ];
    public versionLinks: any[] = [];


    public routeHomeLinks = [{ link: 'crm/home', name: 'Home', icon: 'home', isActive: false }];

    toggleMenu(optionalBoolean?: boolean) {
        if (optionalBoolean !== undefined) {
            this.expanded.set(optionalBoolean);
            localStorage.setItem('menuState', this.expanded().toString())
        } else {
            this.expanded.update((current) => !current);
            localStorage.setItem('menuState', this.expanded().toString())
        }
    }

    setActiveMenu(menu: string) {
        if (menu === 'home') {
            this.activeMenu.set(menu)
            this.setAvailableMenus()
            this.redirectTo(this.routeHomeLinks[0])
            this.expanded.update(() => false);
            this.router.navigate(['/crm/home']); // Navigálás a Home oldalra
            localStorage.setItem('menuState', this.expanded().toString());
        } else {
            this.activeMenu.set(menu)
            this.setAvailableMenus()
            this.expanded.update(() => true);
            localStorage.setItem('menuState', this.expanded().toString());
        }
    }

    setLocalStorageActiveMenu() {
        localStorage.setItem('activeMenu', this.activeMenu())
    }
    setLocalStorageActiveSubMenu(route: any) {
        localStorage.setItem('activeSubMenu', route.link)
    }
    redirectTo(route?: any) {
        this.currentActiveRouteLinks().forEach((r: any) => { r.isActive = false; });
        route.isActive = true
        this.setLocalStorageActiveSubMenu(route)
    }

    setAvailableMenus(): void {
        this.versionLinks = [];
        for (let i = 1; i <= 40; i++) {
            const majorVersion = Math.floor(i / 10) + 1;  // Major version increments every 10
            const minorVersion = i % 10;  // Minor version loops from 0 to 9
            const versionNumber = `${majorVersion}.${minorVersion}`;

            this.versionLinks.push({
                link: `crm/version/${versionNumber}`,
                name: `Verzió ${versionNumber}`,
                isActive: false
            });
        }
        this.setLocalStorageActiveMenu()
        switch (this.activeMenu().toLowerCase()) {
            case 'home':
                this.name.set('Kezdőlap');
                this.grouptext.set('');
                this.currentActiveRouteLinks.set(this.routeHomeLinks);

                break;
            case 'tasks':
                this.name.set('Feladatok');
                this.grouptext.set('FELADATOK');
                this.currentActiveRouteLinks.set(this.routeTaskLinks);
                break;
            case 'user':
                this.name.set('Profil');
                this.grouptext.set('Általános beállítások');
                this.currentActiveRouteLinks.set([]);
                break;
            case 'versions':
                this.name.set('Verziók');
                this.grouptext.set('Legutóbbi verziók');
                this.currentActiveRouteLinks.set(this.versionLinks);
                break;
            default:
                this.name.set('');
                this.grouptext.set('');
                this.currentActiveRouteLinks.set([]);
                break;
        }
    }

    hideMenu() {
        this.expanded.set(false);
    }

}
