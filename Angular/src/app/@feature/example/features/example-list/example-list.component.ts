import { Component, inject } from '@angular/core';
import { Example, ExampleStore } from '../../data-access/example.store';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-example-list',
  imports: [],
  templateUrl: './example-list.component.html',
  styleUrl: './example-list.component.scss',
  providers: [ExampleStore]
})
export class ExampleListComponent {

  readonly store = inject(ExampleStore);


  addExample(example: Example): void {
    this.store.addExample(example);
  }
}
