import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'outer-side-nav',
  imports: [
    MatIconModule,
    RouterModule,
    CommonModule,
    MatListModule,
  ],

  templateUrl: './outer-side-nav.component.html',
  styleUrl: './outer-side-nav.component.scss'
})
export class OuterSideNavComponent {
  @Input() isExpanded: boolean = true;
  @Output() changeMenu = new EventEmitter();

  public menus = [
    { link: 'home', name: 'Kezdőlap', icon: 'home' },
    { link: 'tasks', name: 'Feladatok', icon: 'settings' },
    { link: 'settings', name: 'Beállítások', icon: 'dvr' },
  ];

  onMenuClick(link: string) {
    this.changeMenu.emit(link)
    this.isExpanded = true
  }
}
