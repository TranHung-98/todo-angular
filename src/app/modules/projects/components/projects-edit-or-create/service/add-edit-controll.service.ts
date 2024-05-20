import { Injectable } from "@angular/core";
import { IUserNotPaddingResponse } from "src/app/interfaces/add-edit-project.interface";
import { AddEditFormService } from "./add-edit-form.service";
import { EStatus } from "src/app/enums/status-filter.enum";

@Injectable()
export class AddEditControllService {
  showTargetUser: boolean = false;
  targetUserItem: number[] = [];

  constructor(private projectFormService: AddEditFormService) { }

  handleFindUserById(userId: number, user: IUserNotPaddingResponse[]) {
    return user.find(user => user.id === userId);
  }

  setShowTargetUser() {
    this.showTargetUser = true;
  }

  setHideTargetUser() {
    this.showTargetUser = false;
  }

  setTargetUserId(user: number) {
    this.targetUserItem.push(user);
  }

  setBackTargetUser(userId: number) {
    this.targetUserItem = this.targetUserItem.filter(id => id !== userId);
  }

  setTargetUserIdEmtry() {
    this.targetUserItem = [];
  }

  checkShadow() {
    if (this.projectFormService.projectForm && this.projectFormService.projectForm.controls.teamArrayForm) {
      return this.projectFormService.projectForm.controls.teamArrayForm.controls.some(control => {
        if (control.value && control.value.type) {
          return control.value.type === EStatus.SHADOW;
        }
        return false;
      });
    }
    return false;
  }
}
