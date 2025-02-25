import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { DeviceStore } from '../../../../@core/stores/device.store';
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
    width: string = "60px";
    deviceStore = inject(DeviceStore)
    public menu: string = "";
    device: any;
    constructor(
        private _navMenuService: NavMenuService,
    ) {
    }
    ngOnInit(): void {
        this.device = this.deviceStore.getDevice();
        if (this.device.isMobile) {
            this.width = "40px"
        }
        else {
            this.width = "60px"
        }
        let menuState = localStorage.getItem('menuState');
        const isMenuExpanded = menuState === 'true';
        this._navMenuService.expanded.update(() => isMenuExpanded);
    }
}
