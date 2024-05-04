import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import { CheckboxComponent } from 'src/app/shared/components/check-box/checkbox.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    CommonModule,
    ButtonComponent,
    HttpClientModule,
    CheckboxComponent,
    TextFieldComponent,
    AuthenRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    MatNativeDateModule
  ],
  exports: [
    AuthenRoutingModule,
  ],
  providers: [],
})
export class AuthModule { }
