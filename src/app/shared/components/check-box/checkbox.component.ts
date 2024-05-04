import { Component, Input, forwardRef } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [MatCardModule, MatCheckboxModule, FormsModule, MatRadioModule, ReactiveFormsModule],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() value: boolean = false;
  @Input() indeterminate = false;
  @Input() className: string = '';
  @Input() labelPosition: 'before' | 'after' = 'after';

  constructor() { }

  onChange = (value: boolean) => {
    this.value = value;
  };
  onTouched = () => { };

  registerOnChange(fn: () => boolean): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  handleChange(value: MatCheckboxChange) {
    this.onChange(value.checked);
  }

}
