import { Component, HostBinding, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  standalone: true,
})
export class CheckboxComponent implements ControlValueAccessor {

  constructor() { }
  @Input() className: string = '';
  @Input() value!: boolean;

  onChange = (value: boolean) => {
    this.value = value;
  };
  onTouched = () => { };

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.className;
  }

  onChangeInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.value = target.checked;
      this.onChange(target.checked);
      this.onTouched();
    }
  }
}
