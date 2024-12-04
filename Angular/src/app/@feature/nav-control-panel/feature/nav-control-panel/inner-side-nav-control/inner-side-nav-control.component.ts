import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InnerSideNavComponent } from '../inner-side-nav/inner-side-nav.component';
import { NavMenuService } from '../../../data-access/nav-menu.service';

@Component({
  selector: 'inner-side-nav-control',
  imports: [MatIconModule,
    RouterModule,
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    InnerSideNavComponent,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,],
  templateUrl: './inner-side-nav-control.component.html',
  styleUrl: './inner-side-nav-control.component.scss'
})
export class InnerSideNavControlComponent implements OnInit {

  public isExpanded!: boolean;

  constructor(public _navMenuService: NavMenuService) {
  }

  ngOnInit() {
    this.isExpanded = this._navMenuService.expanded();

  }


  @Input() activeMenu: string = "";

  onRouteClick(link: string) {
    console.log('Navigating to:', link);
  }
  toggleMenu(e: any) {
    console.log(e, 'any')
    console.log(this.isExpanded)

  }


}