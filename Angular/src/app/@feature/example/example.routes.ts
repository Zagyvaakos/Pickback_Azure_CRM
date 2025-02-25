import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/example-list/example-list.component').then(
                (file) => file.ExampleListComponent
            ),
    },
    {
        path: 'view/:id',
        loadComponent: () =>
            import('./features/example-edit/example-edit.component').then(
                (file) => file.ExampleEditComponent
            ),
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./features/example-edit/example-edit.component').then(
                (file) => file.ExampleEditComponent
            ),
    },
];
