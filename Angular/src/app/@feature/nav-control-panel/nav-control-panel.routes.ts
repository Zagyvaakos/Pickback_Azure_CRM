import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';


export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './feature/nav-control-panel/nav-control-panel.component'
      ).then((file) => file.NavControlPanelComponent),
    children: [
      //** Üres */
      { path: '', redirectTo: 'crm/home', pathMatch: 'full' },
      //** Kezdőlap */
      {
        title: 'Kezdőlap',
        path: 'crm/home',
        loadChildren: () =>
          import('../home/home.routes').then(
            (file) => file.routes
          ),
      },
      {
        title: 'Feladatok',
        path: 'crm/tasks',
        loadChildren: () =>
          import('../azure-task/azure-task.routes').then(
            (file) => file.routes
          ),
      },
      {
        title: 'Példa',
        path: 'crm/examples',
        loadChildren: () =>
          import('../example/example.routes').then(
            (file) => file.routes
          ),
      },

      {
        title: 'Feladatok',
        path: 'crm/alltasks',
        loadChildren: () =>
          import('../azure-task/azure-task.routes').then(
            (file) => file.routes
          ),
      },
      {
        title: 'Felhasználó',
        path: 'crm/user',
        loadChildren: () =>
          import('../user/user.routes').then(
            (file) => file.routes
          ),
      },
      {
        title: 'Felhasználó',
        path: 'crm/tasks/wasd',
        loadChildren: () =>
          import('../user/user.routes').then(
            (file) => file.routes
          ),
      },
    ],
  },

];
