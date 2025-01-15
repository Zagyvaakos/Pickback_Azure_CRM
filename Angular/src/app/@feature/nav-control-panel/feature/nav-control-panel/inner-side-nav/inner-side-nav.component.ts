import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { NavMenuService } from '../../../data-access/nav-menu.service';
import { ChangeDetectorRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AUTH_TOKEN_KEY } from '../../../../auth/auth.config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../user/data-access/user.service';

@Component({
  selector: 'inner-side-nav',
  imports: [
    MatIconModule,
    RouterModule,
    ButtonModule,
    TooltipModule,
    CommonModule,
    MatListModule,
  ],

  templateUrl: './inner-side-nav.component.html',
  styleUrl: './inner-side-nav.component.scss'
})
export class InnerSideNavComponent implements OnInit {
  constructor(
    public _navMenuService: NavMenuService,
    private cdr: ChangeDetectorRef,
    public userService: UserService,
  ) { }

  matSnackBar = inject(MatSnackBar);

  authTokenKey = inject(AUTH_TOKEN_KEY);
  router = inject(Router);
  public currentRouteLinks: any[] = [];

  @Input() activeMenu: string = '';
  name: string = "Vissza"
  grouptext: string = '';

  user: any = {
    name: 'Kiss János',
    email: 'Kiss.Janika@gmail.com',
    phone: '+36202231515'
  }
  // public routeHomeLinks: any[] = [
  //   { link: 'crm/mainpage', name: 'Kezdőlap', icon: 'home', isActive: false },
  //   { link: 'crm/faq', name: 'FAQ', icon: 'info', isActive: false },
  //   { link: 'crm/test', name: 'darkmode', icon: 'toggle_on', isActive: false },
  // ];

  public routeTaskLinks: any[] = [
    { link: 'crm/alltasks', name: 'Összes feladat', isActive: false, queryParams: { status: 'active' } },
    { link: 'crm/tasks', name: 'Aktív felatadok', isActive: false },
    { link: 'crm/tasks', name: 'Saját feladataim', isActive: false },
    { link: 'crm/tasks', name: 'Megosztott feladatok', isActive: false },
    { link: 'crm/tasks', name: 'Elkészült feladatok', isActive: false },
  ];

  // public routeSettingsLinks: any[] = [
  //   { link: 'crm/home', name: 'Aktív feladatok', icon: 'home', isActive: false },
  //   { link: 'crm/tasks', name: 'Nyitott feladatok', icon: 'settings', isActive: false },
  //   { link: 'crm/settings', name: 'Elmúlt 7 nap feladatai', icon: 'settings', isActive: false },
  // ];
  // public routeUserLinks: any[] = [
  //   { link: 'crm/user/edit', name: 'Felhasználó', icon: 'home', isActive: false },
  //   { link: 'crm/tasks', name: 'Értesítések', icon: 'settings', isActive: false },
  //   { link: 'crm/settings', name: 'Stílus és megjelenés', icon: 'settings', isActive: false },
  // ];
  public routeUserLinks: any[] = []

  ngOnInit(): void {
    //TODO user
    this.user = this.user //api call here for user maybe or cached user from login needed

    const storedMenu = localStorage.getItem('activeMenu');
    this.activeMenu = storedMenu !== null ? storedMenu : '';
    console.log(this.activeMenu)
    this.updateMenuData();
    const activeSubMenu = localStorage.getItem('activeSubMenu');
  }

  ngOnChanges(): void {
    if (this.activeMenu !== '') {
      this.updateMenuData();
      this.cdr.detectChanges();
    }
  }

  goToUserEdit() {
    this.router.navigate(['crm/user/edit'])
  }

  updateMenuData(): void {
    localStorage.setItem('activeMenu', this.activeMenu)

    switch (this.activeMenu.toLowerCase()) {
      // case 'home':
      //   this.name = 'Kezdőlap';
      //   this.currentRouteLinks = this.routeHomeLinks;
      //   break;
      case 'tasks':
        this.name = 'Feladatok';
        this.grouptext = 'FELADATOK';

        this.currentRouteLinks = this.routeTaskLinks;
        break;
      // case 'settings':
      //   this.name = 'Beállítások';
      //   this.currentRouteLinks = this.routeSettingsLinks;
      //   break;
      case 'user':
        this.name = 'Profil';
        this.grouptext = 'Általános beállítások';
        this.currentRouteLinks = this.routeUserLinks;
        break;
      default:
        this.name = '';
        this.currentRouteLinks = [];
        break;
    }

  }

  onRouteClick(route: any) {
    this.currentRouteLinks.forEach(r => r.isActive = false);
    route.isActive = true
    localStorage.setItem('activeSubMenu', route.link)
    this.cdr.detectChanges();
  }
  trackByRoute(index: number, item: any): string {
    return item.link;
  }
  hideMenu() {
    this._navMenuService.expanded.update(() => (false))
  }

  logOut() {

    localStorage.setItem(this.authTokenKey, '')
    this.matSnackBar.open('Ön kijelentekzett!', undefined, {
      panelClass: 'success',
      duration: 3000,
    });

    this.router.navigate(['/login'])
  }
}
