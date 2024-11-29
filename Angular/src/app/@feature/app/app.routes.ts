import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'homePage', pathMatch: 'full' },
  {
    path: 'homePage',
    loadComponent: () =>
      import('../azure-task/feature/azure-task-list/azure-task-list.component').then(
        (file) => file.AzureTaskListComponent
      ),
  },
  { path: '**', pathMatch: 'full', redirectTo: 'homePage' },

  // {
  //   path: 'pages',
  //   canActivate: [authGuard],
  //   loadChildren: () =>
  //     import('../control-panel/control-panel.routes').then(
  //       (file) => file.routes
  //     ),
  // },
  // { path: '**', pathMatch: 'full', redirectTo: 'pages' },


  // { path: '', redirectTo: '/azure-tasks', pathMatch: 'full' },
  // { path: 'azure-tasks', component: AzureTasksComponent },
];