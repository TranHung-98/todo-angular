import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { ILoginFormInterface } from '../../interfaces/login.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    userNameOrEmailAddress: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberClient: [false]
  });
  passwordVisible = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
  ) { }

  handleSubmitForm(): void {
    const submitForm: ILoginFormInterface = {
      password: this.loginForm.value.password,
      rememberClient: this.loginForm.value.rememberClient,
      userNameOrEmailAddress: this.loginForm.value.userNameOrEmailAddress,
    };
    this.authenticationService.login(submitForm);
  }

}
