import { Component, HostBinding, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  constructor() { }

  @Input() className: string = '';
  @Input() id: string = '';
  @Input() value!: string;

  onChange = (value: string) => {
    this.value = value;
  };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.className;
  }

  @HostBinding('id')
  get hostId(): string {
    return this.id;
  }

  onChangeInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.value = target.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }
}
