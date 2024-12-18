import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NavMenuService } from '../../../data-access/nav-menu.service';

@Component({
  selector: 'inner-side-nav',
  imports: [
    MatIconModule,
    RouterModule,
    CommonModule,
    MatListModule,
  ],

  templateUrl: './inner-side-nav.component.html',
  styleUrl: './inner-side-nav.component.scss'
})
export class InnerSideNavComponent implements OnInit {
  constructor(public _navMenuService: NavMenuService) { }



  @Input() activeMenu: string = '';
  @Output() toggleMenu = new EventEmitter();
  name: string = "Vissza"



  public routeHomeLinks = [
    { link: 'crm/mainpage', name: 'Kezdőlap', icon: 'home', isActive: false },
    { link: 'crm/faq', name: 'FAQ', icon: 'info', isActive: false },
    { link: 'crm/test', name: 'darkmode', icon: 'toggle_on', isActive: false },
  ];

  public routeTaskLinks = [
    { link: 'crm/home', name: 'Kezdőlap', icon: 'home', isActive: false },
    { link: 'crm/tasks', name: 'Feladatok', icon: 'settings', isActive: false },
    { link: 'crm/settings', name: 'Beállítások', icon: 'settings', isActive: false },
  ];

  public routeSettingsLinks = [
    { link: 'crm/home', name: 'Aktív feladatok', icon: 'home', isActive: false },
    { link: 'crm/tasks', name: 'Nyitott feladatok', icon: 'settings', isActive: false },
    { link: 'crm/settings', name: 'Elmúlt 7 nap feladatai', icon: 'settings', isActive: false },
  ];
  public routeUserLinks = [
    { link: 'crm/home', name: 'Aktív feladatok', icon: 'home', isActive: false },
    { link: 'crm/tasks', name: 'Nyitott feladatok', icon: 'settings', isActive: false },
    { link: 'crm/settings', name: 'Beállítások', icon: 'settings', isActive: false },
  ];


  ngOnInit(): void {
  }
  get routeLinks() {

    switch (this.activeMenu.toLowerCase()) {
      case 'home':
        this.name = "Kezdőlap"
        return this.routeHomeLinks;
      case 'tasks':
        this.name = "Feladatok"
        return this.routeTaskLinks;
      case 'settings':
        this.name = "Beállítások"
        return this.routeSettingsLinks;
      case 'user':
        this.name = "Profil"
        return this.routeUserLinks;
      default:
        return [];
    }
  }

  onRouteClick(route: any) {
    this.routeLinks.forEach(r => r.isActive = false);
    route.isActive = true
    this.toggleMenu.emit(route.link)
  }
  trackByRoute(index: number, item: any): string {
    return item.link; // Use the unique link as the trackBy key
  }
  hideMenu() {
    this._navMenuService.expanded.update(() => (false))
  }
}
