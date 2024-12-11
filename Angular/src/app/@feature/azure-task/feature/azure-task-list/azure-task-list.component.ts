import { Component, CUSTOM_ELEMENTS_SCHEMA, isDevMode, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzureTaskService } from '../../data-access/azure-task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { InputTextModule } from 'primeng/inputtext';
import { MatIconModule } from '@angular/material/icon';
@Component({

  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, InputTextModule, TableModule, InputTextModule, ButtonGroupModule, MatButtonModule, ButtonModule, DropdownModule, FormsModule, MultiSelectModule, DataViewModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-azure-task-list',
  templateUrl: './azure-task-list-mobile.component.html',
  styleUrl: './azure-task-list-mobile.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AzureTaskListComponent implements OnInit {

  constructor(
    private azureTaskService: AzureTaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  isDefault = true;
  workItems = signal<any>([]);
  workItemsToShow = signal<any>([]);
  rowsPerPage = 10;
  searchText: string = '';
  statuses = [
    { value: 0, name: 'Áll' },
    { value: 1, name: 'Hibás' },
    { value: 2, name: 'Kész' },
    { value: 3, name: 'Új' },
    { value: 4, name: 'Kész' },
  ];
  selectedCity: any;
  selectedCities: any[] = [];
  selectedNames: any[] = [];

  ngOnInit(): void {
    console.log(this.route, 'route')
    const savedState = this.loadPaginationState();
    if (savedState) {

      this.rowsPerPage = savedState.rows;

    }
    this.loadItems();

  }
  onPageChange(event: any) {
    // Save the new page and rows per page
    this.savePaginationState(event.rows,);
  }
  savePaginationState(rows: number,) {
    const paginationState = {

      rows: rows,

    };
    localStorage.setItem('paginationState', JSON.stringify(paginationState));
  }
  loadPaginationState() {
    const savedState = localStorage.getItem('paginationState');
    if (savedState) {
      return JSON.parse(savedState);
    }
    return null;
  }

  trackById(index: number, item: any) {
    return item.id;
  }
  loadItems() {
    this.getWorkItems().subscribe({
      next: (result) => {
        if (result) {
          result.objects[2].status = 1;
          result.objects[4].status = 2;
          result.objects[3].status = 3;
          result.objects[5].status = 0;
          result.objects[6].status = 3;
          result.objects[9].status = 2;
          result.objects[4].type = 1;
          result.objects[0].type = 2;
          result.objects[6].type = 3;
          result.objects[3].type = 2;
          result.objects[8].type = 3;
        }


        this.workItems.set(result.objects);
        this.filterData();
      },
      error: (err) => {
        console.error('Error loading items:', err);
      },
    });
  }
  filterData(): void {
    let allItems = [...this.workItems()];
    let filteredItems: any[] = [];

    if (this.selectedCities.length > 0) {
      filteredItems = [...allItems.filter(item => this.selectedCities.some(status => status.value === item.status))]

    } else {
      if (filteredItems.length === 0) {
        filteredItems = [...allItems];
      }
    }
    this.workItemsToShow.set(filteredItems);
  }
  getWorkItems() {
    return this.azureTaskService.getQueries();
  }
  getNames() {
    let names: any[] = []
    this.workItems().forEach((element: { title: string; }) => {
      names.push({ name: element.title })
    });
    return names
  }
  clearFilter(): void {
    this.selectedCity = null;
    this.selectedCities = [];
    this.filterData();
  }
  getTypeColor(status: number): string {
    switch (status) {
      case 0:
        return '24px solid #c32828f0';
      case 1:
        return '24px solid #63c328bf';
      case 2:
        return '24px solid #288fc3bf';
      case 3:
        return '24px solid #e98400f0';
      case 4:
        return '24px solid #8a8a8af0';
      default:
        return '';
    }
  }
  getTypeIcon(type: number): string {
    switch (type) {
      case 0:
        return 'task';
      case 1:
        return 'task';
      case 2:
        return 'bug_report';
      case 3:
        return 'text_snippet';
      case 4:
        return 'schedule';
      default:
        return '';
    }
  }


  getStateColor(state: number): string {
    switch (state) {
      case 0:
        return '#c32828f0';
      case 1:
        return '#e98400f0';
      case 2:
        return '#63c328bf';
      case 3:
        return '#8a8a8af0';
      case 4:
        return '#288fc3bf';
      case 5:
        return '#e98400f0';
      default:
        return '';
    }
  }

  getStateBackgroundColor(state: number): string {

    switch (state) {
      case 0:
        return '#c3282838';
      case 1:
        return '#e9840038';
      case 2:
        return '#63c32838';
      case 3:
        return '#8a8a8a38';
      case 4:
        return '#288fc338';
      case 5:
        return '#e9840038';
      default:
        return '';
    }



  }

  getStateString(state: number): string {
    switch (state) {
      case 0:
        return 'Áll';
      case 1:
        return 'Hibás';
      case 2:
        return 'Kész';
      case 3:
        return 'Új';
      case 4:
        return 'Aktív';
      default:
        return 'Lezárt';
    }
  }


  isMobile() {
    return true
  }

  sortField: string | null = null;
  sortOrder: number = 1;
  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    } else {
      this.sortField = field;
      this.sortOrder = 1;
    }
  }
  navigateTo(view: string, id: string): void {

    this.router.navigate([view, id], { relativeTo: this.route });
  }
}