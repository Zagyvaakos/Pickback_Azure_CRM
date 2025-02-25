import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, ElementRef, input, Input, model, OnDestroy, OnInit, Optional, viewChild } from '@angular/core';
import { ControlContainer, FormControl, FormsModule, NgForm, } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Validator } from './validator';

@Component({
  selector: 'basic-input',
  standalone: true,
  imports: [InputTextModule, CommonModule, FormsModule, NgClass,],
  templateUrl: './basic-input.component.html',
  styleUrl: './basic-input.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      deps: [[Optional, NgForm]],
      useFactory: (ngForm: NgForm) => ngForm,
    },
  ]
})
export class BasicInputComponent implements OnInit, OnDestroy {


  @Input() placeholder: string = 'Üres mező';
  @Input() privateClass: string = 'override-this';
  @Input() modelValue: any = null;

  @Input() id: string = 'basicInput'

  readonly label = input<string>('');
  readonly name = input<string>(crypto.randomUUID());
  readonly type = input<string>('text');
  readonly prefix = input<string>('');
  readonly suffix = input<string | null | undefined>('');
  readonly validator = input<Validator>();
  readonly value = model<any>();
  readonly isDisabled = input<boolean>(false);
  readonly isErrorMessageDisabled = input<boolean>(false);
  readonly inputElRef = viewChild<ElementRef<HTMLInputElement>>('inputElRef');


  readonly isRequired = computed<boolean>(
    () => this.validator()?.required ?? false
  );

  readonly formFieldNgClass = computed(() => {
    return {
      filled: this.value() != null && this.value() !== '',
      disabled: this.isDisabled(),
    };
  });


  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
  getDynamicClass() {
    return { [this.privateClass]: !!this.privateClass };
  }
}
