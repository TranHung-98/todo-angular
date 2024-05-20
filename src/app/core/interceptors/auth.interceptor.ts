import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SweetAlertService } from 'src/app/shared/sweetalert/service/sweetalert.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private sweetAlertService: SweetAlertService,
  ) { }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('accessToken');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        }
      });
    }

    return next.handle(request).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // eslint-disable-next-line no-console
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.handleAuthError();
        } else if (error.error instanceof ProgressEvent) {
          this.sweetAlertService.fireErrorAlert('An error has occurred!', 'Error detail not sent by server.', 400000, false, true, 'center', 'Ok', '#7066e0');
        }
        return throwError(() => error);
      })
    );
  }

  private handleAuthError(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem('language');
    this.cookieService.deleteAll();
  }
}
