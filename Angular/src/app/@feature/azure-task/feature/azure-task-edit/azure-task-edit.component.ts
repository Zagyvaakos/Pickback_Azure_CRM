import { CommonModule, Location } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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


@Component({
    standalone: true,
    imports: [CommonModule, TooltipModule, ReactiveFormsModule, RouterModule, EditorModule, MatIconModule, InputTextModule, TableModule, InputTextModule, MatButtonModule, ButtonModule, DropdownModule, FormsModule, MultiSelectModule, DataViewModule, FileUploadModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    selector: 'app-azure-task-edit',
    templateUrl: './azure-task-edit.component.html',
    styleUrl: './azure-task-edit.component.scss',
    encapsulation: ViewEncapsulation.None,

})
export class AzureTaskEditComponent implements OnInit {
    azureTaskFormGroup!: FormGroup;

    files: any[] = [];



    constructor(

        public taskUI: AzureTaskUIService,
        public navigationService: NavigationService,
        public router: Router,
        private aroute: ActivatedRoute,
        private azureTaskService: AzureTaskService,
        private formBuilder: FormBuilder,
        private location: Location,
        public userService: UserService,
    ) {
        this.azureTaskFormGroup = new FormGroup({
            id: new FormControl(null),
            title: new FormControl(null),
            description: new FormControl(null),
            type: new FormControl(null),
            comments: new FormArray([]),
        })

    }

    id: any;
    selectedCity: any;
    selectedCities: any[] = [];
    uploadedFiles: any[] = [];
    // azureTaskForm!: FormGroup


    // comments: any[] = [{ value: 1 }]
    // statuses2 = [

    //     { value: AzureTaskStatusType.STOPPED, name: 'Áll' },
    //     { value: AzureTaskStatusType.ERROR, name: 'Hibás' },
    //     { value: AzureTaskStatusType.DONE, name: 'Kész' },
    //     { value: AzureTaskStatusType.NEW, name: 'Új' },
    // ]

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
            console.log('heki')
            // if (+this.id !== 0) {
            //     this.loadTaskData(this.id);
            // } else {
            //     this.resetFormForNewTask();
            // }
        });
        this.aroute.paramMap.subscribe((params) => {
            console.log('Route parameter changed:', params);
        });

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
                    type: result.type,
                });

            });
        }
        else {
            this.azureTaskFormGroup.patchValue({
                id: 0,
                title: null,
                description: null,
                type: {
                    name: "Hiba", value: "Bug"
                },
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
    }

    isCommentEditing(index: number) {

    }


    onChangeSelect(event: any) {

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
        this.azureTaskFormGroup.controls['type'].setValue(value);
    }
    saveTask() {

        const data = {
            id: this.id,
            type: this.azureTaskFormGroup.controls['type'].value.value,
            title: this.azureTaskFormGroup.controls['title'].value,
            description: this.azureTaskFormGroup.controls['description'].value,
            siteUrl: "string",
            affectedVersion: "string",
            fixedVersion: "string",
            attachments: [null]
        };

        this.files.forEach((file) => {
            let attachment: any
            attachment = {
                id: 0,
                file: {
                    id: 0,
                    name: file.name,
                    extension: file.type
                }
            }
            data.attachments.push(attachment)
        })
        if (this.id === '0') {
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
    deleteComment(index: number) {
        const commentsArray = this.azureTaskFormGroup.get('comments') as FormArray;
        if (index >= 0 && index < commentsArray.length) {
            commentsArray.removeAt(index);
        }
    }
    onUpload(event: any) {
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
