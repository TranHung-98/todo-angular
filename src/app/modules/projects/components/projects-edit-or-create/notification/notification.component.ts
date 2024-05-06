import { AddEditFormService } from '../service/add-edit-form.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENotificationFormGroup } from 'src/app/enums/notifycotion.enum';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  notification = ENotificationFormGroup;
  constructor(
    private projectFormService: AddEditFormService,
    private router: Router, private route: ActivatedRoute
  ) {
    if (!this.projectFormService.checkFormFieldTasksData()) {
      this.backRoute();
    }
  }

  get notificationFormGroup() {
    return this.projectFormService.getNotificationForm();
  }

  backRoute() {
    this.router.navigate(['../tasks',], { relativeTo: this.route });
  }

}
