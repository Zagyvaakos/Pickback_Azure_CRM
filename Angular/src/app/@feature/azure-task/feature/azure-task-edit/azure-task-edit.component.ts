import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { EditorModule } from 'primeng/editor';
import { AzureTaskUIService } from '../../data-access/azure-task-ui.service';
import { AzureTaskService } from '../../data-access/azure-task.service';
import { AzureTaskStatusType } from '../../models/azure-task.model';


@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, EditorModule, MatIconModule, InputTextModule, TableModule, InputTextModule, MatButtonModule, ButtonModule, DropdownModule, FormsModule, MultiSelectModule, DataViewModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    selector: 'app-azure-task-edit',
    templateUrl: './azure-task-edit.component.html',
    styleUrl: './azure-task-edit.component.scss',
    encapsulation: ViewEncapsulation.None,

})
export class AzureTaskEditComponent implements OnInit {

    constructor(
        public taskUI: AzureTaskUIService,
        public router: Router,
        private aroute: ActivatedRoute,
        private azureTaskService: AzureTaskService,
        private formBuilder: FormBuilder,

    ) { }

    id: any;
    selectedCity: any;
    selectedCities: any[] = [];
    azureTaskForm!: FormGroup

    statuses2 = [

        { value: AzureTaskStatusType.STOPPED, name: 'Áll' },
        { value: AzureTaskStatusType.ERROR, name: 'Hibás' },
        { value: AzureTaskStatusType.DONE, name: 'Kész' },
        { value: AzureTaskStatusType.NEW, name: 'Új' },
    ]

    statuses = [
        { value: 0, name: 'Áll' },
        { value: 1, name: 'Hibás' },
        { value: 2, name: 'Kész' },
        { value: 3, name: 'Új' },
        { value: 4, name: 'Kész' },
    ];
    priorities = [
        { value: 0, name: 'Elsődleges' },
        { value: 1, name: 'Másodlagos' },
        { value: 2, name: 'Kevésbé fontos' },
        { value: 3, name: 'SOS' },
    ];


    ngOnInit(): void {

        this.azureTaskForm = this.formBuilder.group({
            name: [null],
            description: [null],
        });

        console.log(this.aroute);
        this.id = this.aroute.snapshot.params['id'];

        // this.azureTaskService.getQueries(this.filter).pipe().subscribe((result) => {
        //     console.log(result, 'result')
        //     if (this.id !== null) {
        //         const found = result.objects.find((obj: any) => obj.id === +this.id);
        //         if (found !== undefined) {
        //             this.azureTaskForm.controls['name'].patchValue(found.title)
        //         } else {
        //         }
        //     }

        // });
    }
}
