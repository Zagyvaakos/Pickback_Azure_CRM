import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // CommonModule for ngIf, etc.
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../../@core/services/theme.service';
import { LoadingComponent } from '../../../@ui/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public themeService: ThemeService,
  ) { }

  ngOnInit(): void {

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
}