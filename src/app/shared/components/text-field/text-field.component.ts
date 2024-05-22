import { Component, HostBinding, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ],
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() className: string = '';
  @Input() placeholder: string = '';
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

  @HostBinding('placeholder')
  get hostPlaceholder(): string {
    return this.placeholder;
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
