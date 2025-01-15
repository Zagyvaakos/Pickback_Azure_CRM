import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-float-input',
  imports: [],
  templateUrl: './float-input.component.html',
  styleUrl: './float-input.component.scss'
})
export class FloatInputComponent implements OnInit, OnDestroy {

  @Input() labelPosition: string = 'on';
  @Input() type: string = 'text';
  @Input() name: string = ''
  @Input() id: string = 'floatInput'
  @Input() control: FormControl = new FormControl(null);

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
}
