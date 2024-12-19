import { Component, CUSTOM_ELEMENTS_SCHEMA, isDevMode, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzureTaskService } from '../../data-access/azure-task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatIconModule } from '@angular/material/icon';
import { AzureTaskUIService } from '../../data-access/azure-task-ui.service';
import { Filter } from '../../../../@shared/models/Filter.model';
@Component({
  selector: 'app-azure-task-list',
  templateUrl: './azure-task-list-mobile.component.html',
  styleUrl: './azure-task-list-mobile.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,  // Standalone component
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    DataViewModule  // Add the module here, not the component
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzureTaskListComponent implements OnInit {

  constructor(
    public taskUI: AzureTaskUIService,
    private azureTaskService: AzureTaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateButtonLabel();
    window.addEventListener('resize', () => this.updateButtonLabel());
  }
  totalCount = signal<number>(0);
  filter: Filter = {
    text: '',
    offset: 1,
    limit: 10,
    sortField: 'title',
    sortDirection: 'asc',
    createdUser: { id: 1 },
    companyIds: [],
    statuses: [],
    types: [],
  }
  clearFilterButtonLabel: string = 'Törlés';
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
    console.log(event, 'pagechange')
    this.savePaginationState(event);
  }
  savePaginationState(event: any,) {
    console.log(event, 'event')
    const paginationState = {
      rows: event.rows,
      first: event.first
    };
    localStorage.setItem('paginationState', JSON.stringify(paginationState));
    this.filter.limit = event.rows;

    this.filter.offset = event.first / event.rows + 1
    console.log(this.filter, 'filter')
    this.loadItems()
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
        this.totalCount.set(result.totalCount);
        console.log(this.totalCount(), 'this total')
        console.log(result)
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
    return this.azureTaskService.getQueries(this.filter);
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

  updateButtonLabel() {
    this.clearFilterButtonLabel = window.innerWidth < 1500 ? '' : 'Törlés';
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