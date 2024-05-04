import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router
} from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthenticationService } from "../../authen/service/authentication.service";
import { SweetAlertService } from "src/app/shared/sweetalert/service/sweetalert.service";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private authenticationService: AuthenticationService,
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticationService.isLogin.pipe(
      map(data => {
        if (data) {
          return true;
        } else {
          this.sweetAlertService.fireErrorAlert("Oops...", "You must be logged in!!!", 1000, false, true, "center");
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}