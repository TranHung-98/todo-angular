import { Component, OnInit } from '@angular/core';
import { IUserInfomation } from 'src/app/modules/authen/interfaces/login.interface';
import { AuthenticationService } from 'src/app/modules/authen/service/authentication.service';
import { LoginService } from 'src/app/modules/authen/service/login.service';

@Component({
  selector: 'app-sidebar-head',
  templateUrl: './sidebar-head.component.html',
  styleUrls: ['./sidebar-head.component.scss'],
})
export class SidebarHeadComponent implements OnInit {
  user!: IUserInfomation | null;

  constructor(private authService: AuthenticationService, private loginService: LoginService,) { }


  ngOnInit(): void {
    this.loginService.getLoginInformations().subscribe((res) => {
      this.user = res?.result?.user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
