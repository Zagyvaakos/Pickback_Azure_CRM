import { Component, CUSTOM_ELEMENTS_SCHEMA, isDevMode, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AzureTaskService } from '../../data-access/azure-task.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
// import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { InputTextModule } from 'primeng/inputtext';
@Component({

  standalone: true,
  imports: [CommonModule, RouterModule, InputTextModule, ButtonGroupModule, MatButtonModule, ButtonModule, DropdownModule, FormsModule, MultiSelectModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-azure-task-list',
  templateUrl: './azure-task-list.component.html',
  styleUrl: './azure-task-list.component.scss'
})
export class AzureTaskListComponent implements OnInit {

  azureQueries: any = null;
  azureWorkItems: any = null;
  errorMessage: string = '';
  constructor(private azureTaskService: AzureTaskService) { }
  filterText: string = ''
  azureWorkItems$!: Observable<any[]>;
  workItems: any[] = [];
  columns: any[] = [];
  selectedCity: any = null;
  selectedCities: any[] = [];
  isDefault = true;

  statuses: any[] = [


    { name: 'Aktív', value: 'Active' },
    { name: 'Lezárt', value: 'Closed' },
    { name: 'Felfüggesztett', value: 'Suspended' },
    { name: 'Lefejlesztett', value: 'Implemented' },
    { name: 'Tesztelt', value: 'Tested' },
    { name: 'Új', value: 'New' },

  ];

  ngOnInit(): void {
    const statusNames = [
      'Aktív', 'Lezárt', 'Felfüggesztett', 'Lefejlesztett', 'Tesztelt', 'Új'
    ];
    for (let i = 0; i < 1000; i++) {
      const status = {
        name: statusNames[i % statusNames.length] + i.toString(),  // Loop through the names
        value: statusNames[i % statusNames.length] + i.toString()  // Use the same value or generate a different one if needed
      };
      this.statuses.push(status);
    }
    this.azureWorkItems$ = this.onFetchAzureLatestWorkItems();
    this.azureWorkItems$.subscribe((res: any) => {
      this.workItems = res.workItems; console.log(res, 'res')
      this.columns = res.columns
    })
    this.getRandomItemsForTable().pipe().subscribe(result => { console.log(result) })
  }

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
    return this.azureTaskService.fetchAzureLatestWorkItems();
  }
  getRandomItemsForTable() {
    return this.azureTaskService.getRandomItemsForTable();
  }
  onFilter(event: { originalEvent: Event, filter: string }) {
    const filterQuery = event.filter;
    console.log(event.originalEvent, 'origievent')
    console.log(filterQuery, ' filterquery')
    // Call your backend service with the filter query
    // this.yourService.getFilteredStatuses(filterQuery).subscribe((filteredStatuses) => {
    //   this.statuses = filteredStatuses;  // Update statuses with the filtered list
    // });
  }
}