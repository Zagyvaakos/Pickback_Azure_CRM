import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '../../@core/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loading-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit, OnDestroy {

  constructor(public loadingService: LoadingService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }
}
