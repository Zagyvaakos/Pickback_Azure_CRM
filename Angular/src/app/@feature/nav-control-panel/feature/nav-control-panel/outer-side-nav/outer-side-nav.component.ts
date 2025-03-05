import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../../../@core/services/theme.service';
import { TooltipModule } from 'primeng/tooltip';
import { NavMenuService } from '../../../data-access/nav-menu.service';
import { UserService } from '../../../../user/data-access/user.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'outer-side-nav',
  imports: [
    RouterModule,
    CommonModule,
    TooltipModule,
    MatIconModule,
    MatListModule,
  ],

  templateUrl: './outer-side-nav.component.html',
  styleUrl: './outer-side-nav.component.scss'
})
export class OuterSideNavComponent implements OnInit {
  constructor(public themeService: ThemeService,
    public _navMenuService: NavMenuService,
    public userService: UserService,

  ) {

  }
  isDarkMode: boolean = false;
  public menus = [
    { link: 'home', name: 'Kezdőlap', icon: 'home' },
    { link: 'tasks', name: 'Feladatok', icon: 'dvr' },
    { link: 'versions', name: 'Verzió', icon: 'bolt' },
  ];

  ngOnInit(): void {
    if (this._navMenuService.activeMenu() === 'home') {
      this._navMenuService.expanded.update(() => false);

    }
  }


  onDarkToggle() {
    this.themeService.toggleDarkmode()
  }
  onRoleChange() {
    this.userService.role.update((current) => !current)
  }
  onEditingStateChange() {
    this.userService.isEditing.update((current) => !current)
  }
}
