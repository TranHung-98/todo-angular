import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { ILoginFormInterface } from '../interfaces/login.interface';
import { SweetAlertService } from 'src/app/shared/sweetalert/service/sweetalert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService,
    private sweetAlertService: SweetAlertService,
  ) {
    if (this.cookieService.get('accessToken')) {
      this.isLogin.next(true);
    } else {
      this.isLogin.next(false);
    }
  }

  login(payload: ILoginFormInterface) {
    this.loginService.login(payload)
      .pipe(catchError((err) => of(err)))
      .subscribe((response) => {
        if (response.success) {
          this.cookieService.set('accessToken', response?.result?.accessToken);
          this.sweetAlertService.fireSuccessAlert('', 'Login Successfully!', 2000, true, false, 'top-right');
          this.router.navigate(['projects']);
          this.isLogin.next(true);
        } else {
          this.sweetAlertService.fireErrorAlert(response.error?.error?.message, response.error?.error?.details, 2000, false, true, "center");
        }
      });
  }

  logout(): void {
    this.isLogin.next(false);
    this.cookieService.deleteAll('accessToken');
    this.router.navigate(['/login']);
  }
}
