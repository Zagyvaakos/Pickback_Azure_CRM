import { CommonModule, Location } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, OnInit, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { AzureTaskUIService } from '../../data-access/azure-task-ui.service';
import { AzureTaskService } from '../../data-access/azure-task.service';
import { NavigationService } from '../../../../@shared/navigation/navigation.service';
import { TooltipModule } from 'primeng/tooltip';
import { filter } from 'rxjs';
import { UserService } from '../../../user/data-access/user.service';
import { BasicInputComponent } from '../../../../@ui/input/basic-input/basic-input.component';
import { AzureTask } from '../../models/azure-task.model';
import { AzureTaskEditStore } from '../../data-access/azure-task-edit.store';


@Component({
    standalone: true,
    imports: [CommonModule, TooltipModule, BasicInputComponent, ReactiveFormsModule, RouterModule, EditorModule, MatIconModule, InputTextModule, TableModule, InputTextModule, MatButtonModule, ButtonModule, DropdownModule, FormsModule, MultiSelectModule, DataViewModule, FileUploadModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    selector: 'app-azure-task-edit',
    templateUrl: './azure-task-edit.component.html',
    styleUrls: ['./azure-task-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        AzureTaskEditStore,
    ],
})

export class AzureTaskEditComponent implements OnInit {
    readonly store = inject(AzureTaskEditStore);
    readonly ngForm = viewChild(NgForm);

    files: any[] = [];

    constructor(
        public taskUI: AzureTaskUIService,
        public navigationService: NavigationService,
        public router: Router,
        private aroute: ActivatedRoute,
        private azureTaskService: AzureTaskService,
        private location: Location,
        public userService: UserService,
    ) {
    }

    id: any;
    selectedCity: any;
    selectedCities: any[] = [];
    uploadedFiles: any[] = [];
    types = [
        { value: 'Bug', name: 'Hiba' },
        { value: 'Task', name: 'Feladat' },
        { value: 'UserStroy', name: 'User story' },
    ];
    priorities = [
        { value: 0, name: 'Elsődleges' },
        { value: 1, name: 'Másodlagos' },
        { value: 2, name: 'Kevésbé fontos' },
        { value: 3, name: 'SOS' },
    ];
    queryParams: any = null
    isEditing = false;
    user: any = {
        role: 'User'
    }
    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.id = this.aroute.snapshot.params['id'];

        });
        this.aroute.paramMap.subscribe((params) => {
        });

        this.id = this.aroute.snapshot.params['id'];
        if (+this.id !== 0) {
            this.azureTaskService.getTask(this.id).pipe().subscribe((result) => {
                Object.entries(result).forEach(([key, value]) => {
                    this.onDataChange(key, value)
                });
            });
        }
        else {
        }

    }

    onDataChange(key: any, value: any) {
        this.store.patchModel(key, value)
    }

    saveTask() {
        let data = this.store.model()
        console.log(data, 'data')
        if (this.id === 0) {
            this.azureTaskService.insertData(data).subscribe(response => {
                this.location.back();
            });
        }
        else {
            this.azureTaskService.updateData(data, this.id).subscribe(response => {
                this.location.back();
            });
        }
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            const selectedFiles = Array.from(input.files);

            selectedFiles.forEach((file) => {
                // Avoid duplicate files
                if (!this.files.some(existing => existing.file.name === file.name && existing.file.size === file.size)) {
                    const fileData: any = { file };

                    // Check if the file is an image
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (e: ProgressEvent<FileReader>) => {

                            fileData.preview = e.target?.result as string;
                        };
                        reader.readAsDataURL(file);
                    }
                    fileData.name = file.name;
                    fileData.size = file.size;
                    fileData.type = file.type;

                    this.files.push(fileData);
                }
            });

            input.value = '';
        }
    }

    removeFile(idx: number): void {
        this.files.splice(idx, 1);
    }
}
