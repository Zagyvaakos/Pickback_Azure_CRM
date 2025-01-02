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
  ) { }

  matSnackBar = inject(MatSnackBar);

  authTokenKey = inject(AUTH_TOKEN_KEY);
  router = inject(Router);
  public currentRouteLinks: any[] = [];

  @Input() activeMenu: string = '';
  @Output() toggleMenu = new EventEmitter();
  name: string = "Vissza"
  grouptext: string = '';


  public routeHomeLinks: any[] = [
    { link: 'crm/mainpage', name: 'Kezdőlap', icon: 'home', isActive: false },
    { link: 'crm/faq', name: 'FAQ', icon: 'info', isActive: false },
    { link: 'crm/test', name: 'darkmode', icon: 'toggle_on', isActive: false },
  ];

  public routeTaskLinks: any[] = [
    { link: 'crm/home', name: 'Kezdőlap', icon: 'home', isActive: false },
    { link: 'crm/tasks', name: 'Feladatok', icon: 'settings', isActive: false },
    { link: 'crm/settings', name: 'Beállítások', icon: 'settings', isActive: false },
  ];

  public routeSettingsLinks: any[] = [
    { link: 'crm/home', name: 'Aktív feladatok', icon: 'home', isActive: false },
    { link: 'crm/tasks', name: 'Nyitott feladatok', icon: 'settings', isActive: false },
    { link: 'crm/settings', name: 'Elmúlt 7 nap feladatai', icon: 'settings', isActive: false },
  ];
  public routeUserLinks: any[] = [
    { link: 'crm/user/edit', name: 'Felhasználó', icon: 'home', isActive: false },
    { link: 'crm/tasks', name: 'Értesítések', icon: 'settings', isActive: false },
    { link: 'crm/settings', name: 'Stílus és megjelenés', icon: 'settings', isActive: false },
  ];


  ngOnInit(): void {
    const storedMenu = localStorage.getItem('activeMenu');
    this.activeMenu = storedMenu !== null ? storedMenu : '';
    this.updateMenuData();
  }

  ngOnChanges(): void {
    if (this.activeMenu !== '') {
      this.updateMenuData();
      this.cdr.detectChanges();
    }

  }

  updateMenuData(): void {
    localStorage.setItem('activeMenu', this.activeMenu)

    switch (this.activeMenu.toLowerCase()) {
      case 'home':
        this.name = 'Kezdőlap';
        this.currentRouteLinks = this.routeHomeLinks;
        break;
      case 'tasks':
        this.name = 'Feladatok';
        this.grouptext = 'FELADATOK';

        this.currentRouteLinks = this.routeTaskLinks;
        break;
      case 'settings':
        this.name = 'Beállítások';
        this.currentRouteLinks = this.routeSettingsLinks;
        break;
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
    this.toggleMenu.emit(route.link)
    this.cdr.detectChanges();
  }
  trackByRoute(index: number, item: any): string {
    return item.link; // Use the unique link as the trackBy key
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
