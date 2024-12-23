import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../../../@core/services/theme.service';

@Component({
  selector: 'outer-side-nav',
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule,
    MatListModule,
  ],

  templateUrl: './outer-side-nav.component.html',
  styleUrl: './outer-side-nav.component.scss'
})
export class OuterSideNavComponent {
  constructor(public themeService: ThemeService) {

  }
  @Output() changeMenu = new EventEmitter();
  isDarkMode: boolean = false;
  public menus = [
    { link: 'home', name: 'Kezdőlap', icon: 'home' },
    { link: 'tasks', name: 'Feladatok', icon: 'settings' },
    { link: 'settings', name: 'Beállítások', icon: 'dvr' },
  ];

  onMenuClick(link: string) {
    this.changeMenu.emit(link)
  }
  onDarkToggle() {
    this.themeService.toggleDarkmode()

  }

}
