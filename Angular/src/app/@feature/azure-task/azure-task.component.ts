import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { ApiService } from '../../@core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-azure-tasks',
    imports: [CommonModule],
    templateUrl: 'azure-task.component.html'
})
export class AzureTasksComponent {
  // tasks: any[] = [];
  // errorMessage: string | null = null;

  // private httpClient = inject(HttpClient);

  // constructor() {
  //   this.fetchTasks();
  // }

  // async fetchTasks() {
  //   try {
  //     const response = await axios.get('http://localhost:3000/api/azure-tasks', {
  //       headers: {
  //         'Authorization': 'Basic 8QBTvUA3HTgnrfHYqLK3G2bA08Wt1hsMxG6f1a32V3EAXF1KvKIKJQQJ99AKACAAAAAotW3FAAASAZDOVYbG'
  //       }
  //     });
  //     this.tasks = response.data.value; // Adjust according to Azure DevOps API response format
  //   } catch (error) {
  //     this.errorMessage = 'Error fetching tasks from Azure DevOps';
  //   }
  // }
  azureQueries: any = null;
  azureWorkItems: any = null;
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }

  onFetchAzureQueries() {
    this.apiService.fetchAzureQueries().subscribe(
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
    this.apiService.fetchAzureLatestWorkItems().subscribe(
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