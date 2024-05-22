import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IOption } from 'src/app/interfaces/option.interface';



@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() className: string = '';
  @Input() options: IOption[] = [];

  value?: string;
  onChange = (value: string) => {
    this.value = value;
  };
  onTouched = () => { };

  constructor() { }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.value = target.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }
}
