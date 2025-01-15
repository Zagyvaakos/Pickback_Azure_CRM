import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedImportModule } from '../../../../@shared/modules/SharedImportModules';
import { NavigationService } from '../../../../@shared/navigation/navigation.service';
import { EditInPlaceComponent } from '../../../../@ui/input/edit-in-place/edit-in-place.component';
import { UserService } from '../../data-access/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
  standalone: true,
  imports: [SharedImportModule, EditInPlaceComponent],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserEditComponent implements OnInit {
  constructor(public navigationService: NavigationService,
    public userService: UserService
  ) {

  }
  itemTitle: string = 'Kiss János'
  email: string = 'kiss.janika@gmail.com'
  phone: string = '+36 20 223 3355'
  ngOnInit(): void {

  }
  save() { }
  onTitleChange(a: any) {

  }
  onRoleChange() {
    this.userService.role.update((current) => !current)
  }
}
