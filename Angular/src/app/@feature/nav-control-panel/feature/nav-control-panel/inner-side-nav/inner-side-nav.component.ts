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


  name: string = "Vissza"
  grouptext: string = '';

  user: any = {
    name: 'Kiss János',
    email: 'Kiss.Janika@gmail.com',
    phone: '+36202231515'
  }

  ngOnInit(): void {
    this.user = this.user
    const storedMenu = localStorage.getItem('activeMenu');
    this._navMenuService.activeMenu.set(storedMenu !== null ? storedMenu : '')
    this._navMenuService.setAvailableMenus();

  }

  ngOnChanges(): void {
    if (this._navMenuService.activeMenu() === 'home') {
      this._navMenuService.setAvailableMenus();
    }
    if (this._navMenuService.activeMenu() !== '') {
      this._navMenuService.setAvailableMenus();
      this.cdr.detectChanges();
    }
  }

  goToUserEdit() {
    this.router.navigate(['crm/user/edit'])
  }


  trackByRoute(index: number, item: any): string {
    return item.link;
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
