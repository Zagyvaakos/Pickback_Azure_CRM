import { Routes } from '@angular/router';
import { AzureTasksComponent } from './@feature/azure-task/azure-task.component';

export const routes: Routes = [
    { path: '', redirectTo: '/azure-tasks', pathMatch: 'full' },
    { path: 'azure-tasks', component: AzureTasksComponent },
];