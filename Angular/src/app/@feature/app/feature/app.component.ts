import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // CommonModule for ngIf, etc.
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../../@core/services/theme.service';
import { LoadingComponent } from '../../../@ui/loading/loading.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DeviceStore } from '../../../@core/stores/device.store';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DeviceStore]
})
export class AppComponent implements OnInit {
  readonly deviceStore = inject(DeviceStore);
  constructor(
    public themeService: ThemeService,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    let deviceInfo: any = {
      isMobile: this.deviceService.isMobile() || this.iOS(), // Manual iOS check
      isDesktop: this.deviceService.isDesktop() || this.isMacOS(), // Manual macOS check

      isTablet: this.deviceService.isTablet() as boolean,
    };
    this.deviceStore.setDevice(deviceInfo);
    this.themeService.updateDeviceSizing(deviceInfo);

    let darkmodeString = localStorage.getItem('isDarkmode')
    let darkmode = false;
    switch (darkmodeString) {
      case 'true':
        darkmode = true
        break
      case 'false':
        darkmode = false
        break
      default:
        darkmode = false
        break
    }
    this.themeService.toggleDarkmode(darkmode)

    this.themeService.initializeTheme();
  }
  private isMacOS(): boolean {
    return /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent);
  }

  private iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

}