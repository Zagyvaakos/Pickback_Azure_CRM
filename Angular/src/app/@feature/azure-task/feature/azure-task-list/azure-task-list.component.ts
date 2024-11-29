import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { AzureTaskService } from '../../data-access/azure-task.service';
@Component({
  selector: 'app-azure-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './azure-task-list.component.html',
  styleUrl: './azure-task-list.component.scss'
})
export class AzureTaskListComponent {

  azureQueries: any = null;
  azureWorkItems: any = null;
  errorMessage: string = '';

  constructor(private azureTaskService: AzureTaskService) { }

  onFetchAzureQueries() {
    this.azureTaskService.fetchAzureQueries().subscribe(
      (response) => {
        this.azureQueries = response;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = 'Error fetching tasks from Azure DevOps.';
      }
    );
  }
  onFetchAzureLatestWorkItems() {
    this.azureTaskService.fetchAzureLatestWorkItems().subscribe(
      (response) => {
        this.azureWorkItems = response;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = 'Error fetching tasks from Azure DevOps.';
      }
    );
  }
}