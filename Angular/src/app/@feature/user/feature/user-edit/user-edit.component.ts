import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedImportModule } from '../../../../@shared/modules/SharedImportModules';
import { NavigationService } from '../../../../@shared/navigation/navigation.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
  standalone: true,
  imports: [SharedImportModule],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserEditComponent implements OnInit {
  constructor(public navigationService: NavigationService) {

  }

  ngOnInit(): void {

  }
  save() { }
}
