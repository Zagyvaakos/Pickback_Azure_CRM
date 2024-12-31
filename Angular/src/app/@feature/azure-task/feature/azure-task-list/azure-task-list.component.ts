import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, isDevMode, OnDestroy, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { Subject, takeUntil } from 'rxjs';
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
    ConfirmDialogModule,
    InputTextModule,
    OverlayPanelModule,
    ToastModule,
    ButtonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    DataViewModule  // Add the module here, not the component
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService, MessageService]
})
export class AzureTaskListComponent implements OnInit, OnDestroy {
  constructor(
    public taskUI: AzureTaskUIService,
    private azureTaskService: AzureTaskService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.updateButtonLabel();
    window.addEventListener('resize', () => this.updateButtonLabel());
  }
  @ViewChild('op') op: OverlayPanel | undefined;

  totalCount = signal<number>(0);

  textFilter = signal<string>('')
  typeFilter = signal<any[]>([])
  statusFilter = signal<any[]>([])


  filter: Filter = {
    text: this.textFilter().toLowerCase(),
    offset: 1,
    limit: 10,
    sortField: 'title',
    sortDirection: 'asc',
    createdUser: { id: 1 },
    companyIds: [],
    statuses: this.statusFilter(),
    types: this.typeFilter(),
  }

  clearFilterButtonLabel: string = 'Törlés';
  addTaskButtonLabel: string = 'Új';
  isDefault = true;
  workItems = signal<any>([]);
  workItemsToShow = signal<any>([]);
  rowsPerPage = 10;
  searchText: string = '';
  statuses = [
    { value: 'Stopped', name: 'Áll' },
    { value: 'Bug', name: 'Hibás' },
    { value: 'Completed', name: 'Kész' },
    { value: 'New', name: 'Új' },

  ];
  selectedCity: any;
  selectedCities: any[] = [];
  selectedNames: any[] = [];
  destroy$ = new Subject();


  ngOnInit(): void {
    const savedState = this.loadPaginationState();
    if (savedState) {
      this.rowsPerPage = savedState.rows;
    }
    this.loadItems();

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  onPageChange(event: any) {
    this.savePaginationState(event);
  }
  savePaginationState(event: any,) {
    const paginationState = {
      rows: event.rows,
      first: event.first
    };
    localStorage.setItem('paginationState', JSON.stringify(paginationState));
    this.filter.limit = event.rows;

    this.filter.offset = event.first / event.rows + 1
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
    this.getWorkItems().pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.totalCount.set(result.totalCount);
        console.log(result)
        // if (result) {
        //   result.objects[2].status = 1;
        //   result.objects[4].status = 2;
        //   result.objects[3].status = 3;
        //   result.objects[5].status = 0;
        //   result.objects[6].status = 3;
        //   result.objects[9].status = 2;
        //   result.objects[4].type = 1;
        //   result.objects[0].type = 2;
        //   result.objects[6].type = 3;
        //   result.objects[3].type = 2;
        //   result.objects[8].type = 3;
        // }


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
    this.addTaskButtonLabel = window.innerWidth < 1500 ? '' : 'Új';
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


  onDeleteTask(event: Event, task: any) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Biztosan törli a(z) "' + `${task.title}` + '" című feladatot?',
      header: 'Feladat törlése',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.azureTaskService.delete(task.id).subscribe((response: any) => {
          if (response) {
            this.loadItems();
            this.messageService.add({ severity: 'info', summary: 'Siker!', detail: 'Törlés kész' });

          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Figyelemeztetés!', detail: 'Törlés visszavonva' });
      }
    });
  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.textFilter.set(inputElement.value);
      this.loadItems()
    }
  }



}













// testpost() {
//   const data = {
//     id: 0,
//     company: {
//       id: 0,
//       name: "string"
//     },
//     createdUser: {
//       id: 0,
//       isAdmin: true,
//       isActive: true,
//       company: {
//         id: 0,
//         name: "string"
//       },
//       firstName: "string",
//       lastName: "string",
//       email: "string",
//       passwordHash: "string",
//       phone1: "string",
//       phone2: "string"
//     },
//     createdDate: new Date().toISOString(), // Current date-time in ISO format
//     type: "Bug",
//     status: "New",
//     title: "string",
//     description: "string",
//     siteUrl: "string",
//     affectedVersion: "string",
//     fixedVersion: "string"
//   };

//   // Call the insertData method
//   this.azureTaskService.insertData(data).subscribe(response => {
//     console.log('Data inserted successfully:', response);
//   }, error => {
//     console.error('Error inserting data:', error);
//   });
// }