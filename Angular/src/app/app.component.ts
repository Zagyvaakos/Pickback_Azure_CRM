import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // CommonModule for ngIf, etc.
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Azure Tasks Fetcher';

}