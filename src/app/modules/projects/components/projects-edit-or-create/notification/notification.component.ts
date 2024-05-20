import { AddEditFormService } from '../service/add-edit-form.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENotificationFormGroup } from 'src/app/enums/notification.enum';
import { AddEditControllService } from '../service/add-edit-controll.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  notification = ENotificationFormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectFormService: AddEditFormService,
    private controllAddEditService: AddEditControllService,
  ) {
    if (!this.projectFormService.checkFormFieldTasksData()) {
      this.backRoute();
    }
  }

  get notificationFormGroup() {
    return this.projectFormService.getNotificationForm();
  }

  backRoute() {
    if (!this.controllAddEditService.checkShadow()) {
      this.router.navigate(['../tasks',], { relativeTo: this.route });
    } else {
      this.router.navigate(['../target-user',], { relativeTo: this.route });
    }

  }

}
