import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('../auth/feature/login/login.component').then(
        (file) => file.LoginComponent
      ),
  },

  { path: '', pathMatch: 'full', redirectTo: 'controlPanel' },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../nav-control-panel/nav-control-panel.routes').then(
        (file) => file.routes
      ),
  },
];