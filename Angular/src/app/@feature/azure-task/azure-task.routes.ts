import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/azure-task-list/azure-task-list.component').then(
        (file) => file.AzureTaskListComponent
      ),
  },
  {
    path: 'view/:id',
    loadComponent: () =>
      import('./feature/azure-task-edit/azure-task-edit.component').then(
        (file) => file.AzureTaskEditComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./feature/azure-task-edit/azure-task-edit.component').then(
        (file) => file.AzureTaskEditComponent
      ),
  },
];
