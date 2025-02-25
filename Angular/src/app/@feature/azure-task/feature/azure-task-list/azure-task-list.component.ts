import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, isDevMode, OnDestroy, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { finalize, Subject, takeUntil } from 'rxjs';
import { LoadingComponent } from '../../../../@ui/loading/loading.component';
import { LoadingService } from '../../../../@core/services/loading.service';
import { DeviceStore } from '../../../../@core/stores/device.store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AzureTaskEditStore } from '../../data-access/azure-task-edit.store';
@Component({
  selector: 'app-azure-task-list',
  templateUrl: './azure-task-list.component.html',
  styleUrl: './azure-task-list.component.scss',
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
    DataViewModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService, MessageService, AzureTaskEditStore]
})
export class AzureTaskListComponent implements OnInit, OnDestroy {
  readonly store = inject(AzureTaskEditStore);
  readonly deviceStore = inject(DeviceStore);

  constructor(
    public loadingService: LoadingService,
    public taskUI: AzureTaskUIService,
    private azureTaskService: AzureTaskService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {

    this.updateButtonLabel();
    window.addEventListener('resize', () => this.updateButtonLabel());
    effect(() => {
      const value = this.textFilter();
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.debouncedFilter.set(value);
        this.loadItems();
      }, 300);
    });
  }
  @ViewChild('op') op: OverlayPanel | undefined;
  private debounceTimer: any;
  debouncedFilter = signal<string>('');
  totalCount = signal<number>(0);
  textFilter = signal<string>('');
  typeFilter = signal<any[]>([]);
  statusFilter = signal<any[]>([]);
  paginationLimit = signal<number>(10);
  paginationOffset = signal<number>(1);
  filter = computed(() => ({
    text: this.textFilter().toLowerCase(),
    offset: this.paginationOffset(),
    limit: this.paginationLimit(),
    sortField: 'title',
    sortDirection: 'asc',
    createdUser: { id: 1 },
    companyIds: [],
    statuses: this.statusFilter(),
    types: this.typeFilter(),
  }));

  clearFilterButtonLabel: string = 'Törlés';
  addTaskButtonLabel: string = 'Új';
  isDefault = true;
  workItems = signal<any>([]);
  workItemsToShow = signal<any>([]);
  rowsPerPage = 10;
  searchText: string = '';
  statuses = [
    { value: 'Withdrawn', name: 'Kiszedett' },
    { value: 'Completed', name: 'Kész' },
    { value: 'New', name: 'Új' },
  ];
  types = [
    { value: 'Bug', name: 'Hiba' },
    { value: 'Task', name: 'Feladat' },
    { value: 'UserStory', name: 'US' },
  ]
  selectedStatus: any;
  selectedStatuses: any[] = [];
  selectedType: any;
  selectedTypes: any[] = [];
  selectedNames: any[] = [];
  destroy$ = new Subject();
  device: any;

  ngOnInit(): void {
    this.device = this.deviceStore.getDevice()
    console.log(this.device, 'devájsz')
    // let device = this.deviceStore.getDevice()
    // console.log(device, 'device')
    // this.route.paramMap.subscribe((params) => {
    //   console.log('Route parameter changed:', params);
    // });

    let paginationState = localStorage.getItem('paginationState');
    if (paginationState) {
      const parsedState = JSON.parse(paginationState);
      const rows = parsedState.rows;
      const first = parsedState.first;
      this.paginationLimit.set(rows);
      this.paginationOffset.set(first / rows + 1);
    }
    this.loadingService.isLoading.set(true)
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
    this.paginationLimit.set(event.rows); // Update limit signal
    this.paginationOffset.set(event.first / event.rows + 1); // Update offset signal
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
    this.loadingService.isLoading.set(true)

    setTimeout(() => {

      this.getWorkItems().pipe(takeUntil(this.destroy$), finalize(() => this.loadingService.isLoading.set(false))).subscribe({
        next: (result) => {
          this.totalCount.set(result.totalCount);
          this.workItemsToShow.set(result.objects);
        },

      });
    }, 100)
  }
  filterData(): void {
    this.loadingService.isLoading.set(true)
    let statuses: any[] = [];
    let types: any[] = [];
    this.selectedStatuses.forEach((status) => {

      statuses.push(status.value)
    })

    this.selectedTypes.forEach((type) => {
      types.push(type.value)
    })
    this.statusFilter.set(statuses);
    this.typeFilter.set(types);
    this.loadItems()
    // let allItems = [...this.workItems()];

    // if (this.selectedStatuses.length > 0) {
    //   filteredItems = [...allItems.filter(item => this.selectedStatuses.some(status => status.value === item.status))]

    // } else {
    //   if (filteredItems.length === 0) {
    //     filteredItems = [...allItems];
    //   }
    // }
    // filteredItems = [...allItems];

    // this.workItemsToShow.set(filteredItems);
  }
  getWorkItems() {
    return this.azureTaskService.getQueries(this.filter());
  }
  getNames() {
    let names: any[] = []
    this.workItems().forEach((element: { title: string; }) => {
      names.push({ name: element.title })
    });
    return names
  }
  clearFilter(): void {
    this.selectedStatus = null;
    this.selectedStatuses = [];
    this.selectedType = null;
    this.selectedTypes = [];
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
    }
  }
}









