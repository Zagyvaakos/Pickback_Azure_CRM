import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // CommonModule for ngIf, etc.
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../../@core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet,
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
    console.log(darkmodeString, 'striing')
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
  }
}