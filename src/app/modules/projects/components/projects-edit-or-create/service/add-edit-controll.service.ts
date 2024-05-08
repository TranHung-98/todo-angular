import { Injectable } from "@angular/core";
import { IUserNotPaddingResponse } from "src/app/interfaces/add-edit-project.interface";

@Injectable()
export class AddEditControllService {

  handleAddUser(userId: number, user: IUserNotPaddingResponse[]) {
    return user.find(user => user.id === userId) ? user.find(user => user.id === userId) : false;
  }
}
