import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'edit',
        loadComponent: () =>
            import('./feature/user-edit/user-edit.component').then(
                (file) => file.UserEditComponent
            ),
    },

];
