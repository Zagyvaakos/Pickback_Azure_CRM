import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
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
        loadComponent: () =>
          import('../home/feature/home/home.component').then(
            (file) => file.HomeComponent
          ),
      },
    ],
  },
];
