import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedImportModule } from '../../../../@shared/modules/SharedImportModules';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
  standalone: true,
  imports: [SharedImportModule],
  encapsulation: ViewEncapsulation.None,
})
export class UserEditComponent implements OnInit {


  ngOnInit(): void {

  }
}
