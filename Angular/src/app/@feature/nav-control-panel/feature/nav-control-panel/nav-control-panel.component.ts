import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OuterSideNavComponent } from './outer-side-nav/outer-side-nav.component';
import { InnerSideNavControlComponent } from './inner-side-nav-control/inner-side-nav-control.component';
import { NavMenuService } from '../../data-access/nav-menu.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'nav-control-panel',
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        OuterSideNavComponent,
        InnerSideNavControlComponent,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatProgressBarModule,
        MatExpansionModule,
    ],
    templateUrl: './nav-control-panel.component.html',
    styleUrl: './nav-control-panel.component.scss'
})
export class NavControlPanelComponent implements OnInit {
    public menu: string = "";

    constructor(
        private _navMenuService: NavMenuService,
    ) {
    }
    ngOnInit(): void {
        let menuState = localStorage.getItem('menuState');
        const isMenuExpanded = menuState === 'true';
        this._navMenuService.expanded.update(() => isMenuExpanded);
    }
}
