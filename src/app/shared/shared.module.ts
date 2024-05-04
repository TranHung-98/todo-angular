import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DateTimeFormatPipe } from './pipes/date.pipe';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from './components/button/button.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { CheckboxComponent } from './components/check-box/checkbox.component';
import { InputComponent } from './components/input/input.component';



@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    TextFieldComponent,
    TextFieldComponent,
    DateTimeFormatPipe,
    DatePickerComponent,
    DatePickerComponent,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    TranslateModule,
    CheckboxComponent,
    TextFieldComponent,
    TextFieldComponent,
    DatePickerComponent,
    DateTimeFormatPipe,
    DatePickerComponent,
  ]
})
export class SharedModule { }
