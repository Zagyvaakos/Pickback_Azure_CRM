import { CommonModule, Location } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NavigationService } from '../../../../@shared/navigation/navigation.service';


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
    azureTaskFormGroup!: FormGroup;




    constructor(
        public taskUI: AzureTaskUIService,
        public navigationService: NavigationService,
        public router: Router,
        private aroute: ActivatedRoute,
        private azureTaskService: AzureTaskService,
        private formBuilder: FormBuilder,
        private location: Location
    ) {
        this.azureTaskFormGroup = new FormGroup({
            id: new FormControl(null),
            title: new FormControl(null),
            description: new FormControl(null),
            status: new FormControl(null),
            type: new FormControl(null),
            comments: new FormArray([]),
        })

    }

    id: any;
    selectedCity: any;
    selectedCities: any[] = [];
    // azureTaskForm!: FormGroup


    // comments: any[] = [{ value: 1 }]
    statuses2 = [

        { value: AzureTaskStatusType.STOPPED, name: 'Áll' },
        { value: AzureTaskStatusType.ERROR, name: 'Hibás' },
        { value: AzureTaskStatusType.DONE, name: 'Kész' },
        { value: AzureTaskStatusType.NEW, name: 'Új' },
    ]

    statuses = [
        { value: 'Stopped', name: 'Áll' },
        { value: 'Bug', name: 'Hibás' },
        { value: 'Completed', name: 'Kész' },
        { value: 'New', name: 'Új' },
    ];
    priorities = [
        { value: 0, name: 'Elsődleges' },
        { value: 1, name: 'Másodlagos' },
        { value: 2, name: 'Kevésbé fontos' },
        { value: 3, name: 'SOS' },
    ];


    ngOnInit(): void {
        this.id = this.aroute.snapshot.params['id'];
        if (+this.id !== 0) {
            this.azureTaskService.getTask(this.id).pipe().subscribe((result) => {
                const randomArray: any[] = ['123', 'asd', 'testarray'];
                const commentsFormArray = this.azureTaskFormGroup.get('comments') as FormArray;
                randomArray.forEach((element) => {
                    const commentGroup = new FormGroup({
                        content: new FormControl(element),
                        storedContent: new FormControl(element),
                        editing: new FormControl(false),
                    });
                    commentsFormArray.insert(0, commentGroup);
                });
                this.azureTaskFormGroup.patchValue({
                    id: result.id,
                    title: result.title,
                    description: result.description,
                    status: result.status,
                    type: result.type,
                });

                console.log(this.azureTaskFormGroup, 'fg')
            });
        }
        else {
            this.azureTaskFormGroup.patchValue({
                id: 0,
                title: null,
                description: null,
                status: {
                    name: "Hibás", value: "Bug"
                },
                type: null,
            });
        }

    }
    revertComment(comment: any, i: number) {
        comment.get('editing').setValue(false)
        comment.controls.content.patchValue(comment.controls.storedContent.value)
    }
    saveComment(comment: any, i: number) {
        comment.get('editing').setValue(false)
        comment.controls.storedContent.patchValue(comment.controls.content.value)
    }
    updateTitle(event: any) {
    }
    get commentsArray(): FormArray {
        return this.azureTaskFormGroup.get('comments') as FormArray;
    }

    editorContentChange(event: any, comment: any) {
        console.log(event, 'event')
    }

    isCommentEditing(index: number) {

    }


    onChangeSelect(event: any) {
        console.log(event, 'event')
        console.log(this.azureTaskFormGroup, 'fg on select')
    }

    addNewComment() {
        const commentsFormArray = this.azureTaskFormGroup.get('comments') as FormArray;
        const commentGroup = new FormGroup({
            content: new FormControl(null),
            storedContent: new FormControl(null),
            editing: new FormControl(true),
        });
        commentsFormArray.insert(0, commentGroup);
    }
    onDropdownChange(value: any): void {
        this.azureTaskFormGroup.controls['status'].setValue(value);
        console.log(this.azureTaskFormGroup)
    }
    saveTask() {


        console.log(this.azureTaskFormGroup, 'helo')
        const data = {
            id: this.id,
            type: this.azureTaskFormGroup.controls['type'].value,
            title: this.azureTaskFormGroup.controls['title'].value,
            description: this.azureTaskFormGroup.controls['description'].value,
            siteUrl: "string",
            affectedVersion: "string",
            fixedVersion: "string"
        };

        if (this.id === '0') {
            console.log(data)
            this.azureTaskService.insertData(data).subscribe(response => {
                console.log(response, 'resp')
                console.log('Data inserted successfully:', response);
                this.location.back();
            }, error => {
                console.log(error, 'resp')

                console.error('Error inserting data:', error);
            });
        }
        else {
            this.azureTaskService.updateData(data, this.id).subscribe(response => {
                console.log('Data updated successfully:', response);
                this.location.back();
            }, error => {
                console.error('Error inserting data:', error);
            });
        }


    }
    deleteComment(index: number) {
        const commentsArray = this.azureTaskFormGroup.get('comments') as FormArray;
        if (index >= 0 && index < commentsArray.length) {
            commentsArray.removeAt(index);
        }
    }
}










//   // Call the insertData method
//   this.azureTaskService.insertData(data).subscribe(response => {
//     console.log('Data inserted successfully:', response);
//   }, error => {
//     console.error('Error inserting data:', error);
//   });

// Call the insertData method