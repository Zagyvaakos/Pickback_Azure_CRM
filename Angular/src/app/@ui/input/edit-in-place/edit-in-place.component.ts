import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedImportModule } from '../../../@shared/modules/SharedImportModules';

@Component({
  selector: 'edit-in-place',
  standalone: true,
  imports: [SharedImportModule],
  templateUrl: './edit-in-place.component.html',
  styleUrl: './edit-in-place.component.scss'
})
export class EditInPlaceComponent implements OnInit {
  @Input() title: string = ''; // Accept title as input
  @Output() titleChange = new EventEmitter<string>(); // Emit changes

  savedTitle: string = '';
  isEditing: boolean = false;

  ngOnInit(): void {
    this.savedTitle = this.title
  }

  editTitle() {
    this.isEditing = true;
  }

  saveTitle(newTitle?: any) {
    const trimmedTitle = newTitle.trim();
    this.title = trimmedTitle || this.title;
    this.titleChange.emit(this.title); // Emit updated title
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;

    this.saveTitle(this.savedTitle)
  }
}