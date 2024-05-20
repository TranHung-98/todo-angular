import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IUserInfomation } from 'src/app/modules/authen/interfaces/login.interface';
import { AuthenticationService } from 'src/app/modules/authen/service/authentication.service';
import { LoginService } from 'src/app/modules/authen/service/login.service';

@Component({
  selector: 'app-sidebar-head',
  templateUrl: './sidebar-head.component.html',
  styleUrls: ['./sidebar-head.component.scss'],
})
export class SidebarHeadComponent implements OnInit, OnDestroy {
  user!: IUserInfomation | null;
  destroy$ = new Subject<void>();


  constructor(private authService: AuthenticationService, private loginService: LoginService,) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loginService.getLoginInformations()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.user = res?.result?.user;
      });
  }

  logout() {
    this.authService.logout();
  }
}
