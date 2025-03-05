
import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./feature/home/home.component').then(
                (file) => file.HomeComponent
            ),
    },

];
