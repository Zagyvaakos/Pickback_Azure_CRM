import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule, InputTextModule, TableModule, InputTextModule, ButtonGroupModule, MatButtonModule, ButtonModule, DropdownModule, FormsModule, MultiSelectModule, DataViewModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    selector: 'app-azure-task-edit',
    templateUrl: './azure-task-edit.component.html',
    styleUrl: './azure-task-edit.component.scss',
    encapsulation: ViewEncapsulation.None,

})
export class AzureTaskEditComponent implements OnInit {

    constructor() {

    }


    ngOnInit(): void {

    }
}
