import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SelectComponent } from './components/select/select.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ToastComponent } from './components/toast/toast.component';
import { SecondsToTimePipe } from './pipes/seconds-to-time.pipe';
import { DateTimeFormatPipe } from './pipes/date-format.pipe';
import { TextFieldComponent } from './components/text-field/text-field.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastComponent,
    SelectComponent,
    ButtonComponent,
    CheckboxComponent,
    SecondsToTimePipe,
    DatePickerComponent,
    TextFieldComponent,
    DateTimeFormatPipe,
  ],
  exports: [
    ButtonComponent,
    CheckboxComponent,
    SelectComponent,
    DatePickerComponent,
    ToastComponent,
    SecondsToTimePipe,
    DateTimeFormatPipe,
    TextFieldComponent
  ]
})
export class SharedModule { }
