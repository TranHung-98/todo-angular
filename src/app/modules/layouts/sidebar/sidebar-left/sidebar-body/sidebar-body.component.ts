import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMenuLabels } from 'src/app/enums/menu-lables.enum';

@Component({
  selector: 'app-sidebar-body',
  templateUrl: './sidebar-body.component.html',
  styleUrls: ['./sidebar-body.component.scss'],
})
export class SidebarBodyComponent {
  currentUrl: string = this.router.url;


  constructor(private router: Router, private route: ActivatedRoute) { }


  menuItems = [
    { icon: 'account_box', label: EMenuLabels.MyProfile, routerLink: '/my-profile' },
    { icon: 'group_work', label: EMenuLabels.Admin, routerLink: '/admin/#' },
    { icon: 'assessment', label: EMenuLabels.Projects, routerLink: '/projects' },
    { icon: 'alarm', label: EMenuLabels.MyTimesheets, routerLink: '/admin/#' },
    { icon: 'event_busy', label: EMenuLabels.MyRequest, routerLink: '/admin/#' },
    { icon: 'today', label: EMenuLabels.MyWorking, routerLink: '/admin/#' },
    { icon: 'date_range', label: EMenuLabels.ManageTimesheet, routerLink: '/admin/#' },
    { icon: 'rule', label: EMenuLabels.ManageRequest, routerLink: '/admin/#' },
    { icon: 'access_time', label: EMenuLabels.ManageWorking, routerLink: '/admin/#' },
    { icon: 'groups', label: EMenuLabels.TeamWorking, routerLink: '/admin/#' },
    { icon: 'supervised_user_circle', label: EMenuLabels.TimesheetsMonitoring, routerLink: '/admin/#' },
    { icon: 'event_note', label: EMenuLabels.Retro, routerLink: '/admin/#' },
    { icon: 'rate_review', label: EMenuLabels.ReviewInterns, routerLink: '/admin/#' },
    { icon: 'description', label: EMenuLabels.Report, routerLink: '/admin/#' },
  ];

}
