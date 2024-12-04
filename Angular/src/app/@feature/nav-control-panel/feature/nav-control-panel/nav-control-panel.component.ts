import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OuterSideNavComponent } from './outer-side-nav/outer-side-nav.component';
import { InnerSideNavControlComponent } from './inner-side-nav-control/inner-side-nav-control.component';
import { NavMenuService } from '../../data-access/nav-menu.service';
@Component({
    selector: 'nav-control-panel',
    imports: [
        // NgClass,
        // RouterOutlet,
        // RouterLink,
        // RouterLinkActive,
        MatSidenavModule,
        MatToolbarModule,
        OuterSideNavComponent,
        InnerSideNavControlComponent,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule,
        MatExpansionModule,
    ],
    templateUrl: './nav-control-panel.component.html',
    styleUrl: './nav-control-panel.component.scss'
})
export class NavControlPanelComponent {
    public isExpanded = true;
    public isExpandedInnerMenu = true;
    public menu: string = "";

    constructor(
        private _navMenuService: NavMenuService,
    ) {
    }

    public changeMenu(event: any) {
        this._navMenuService.expanded.update(() => (true));
        this.menu = event
    }
}
