import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { IAddOrEditProjectRequest, IAddOrEditProjectResponse, IBranchesResponse, ICustomerResponse, ICustomerSaveRequest, ITasksResponse, IUserNotPaddingResponse } from 'src/app/interfaces/add-edit-project.interface';
import { IBaseResponse } from 'src/app/modules/authen/interfaces/login.interface';

@Injectable()
export class AddEditApiService {
  constructor(private apiService: ApiService) { }

  getAllTasks() {
    return this.apiService.get<IBaseResponse<ITasksResponse[]>>('services/app/Task/GetAll');
  }

  getUsers() {
    return this.apiService.get<IBaseResponse<IUserNotPaddingResponse[]>>('services/app/User/GetUserNotPagging');
  }

  getAllBranches(isAll: boolean) {
    return this.apiService.get<IBaseResponse<IBranchesResponse[]>>('services/app/Branch/GetAllBranchFilter', { isAll: isAll.toString() });
  }

  getAllCustomers() {
    return this.apiService.get<IBaseResponse<ICustomerResponse[]>>('services/app/Customer/GetAll');
  }

  saveCustomer(customer: ICustomerSaveRequest) {
    return this.apiService.post<IBaseResponse<ICustomerResponse>>('services/app/Customer/Save', customer);
  }

  saveProject(project: IAddOrEditProjectResponse | IAddOrEditProjectRequest) {
    return this.apiService.post('services/app/Project/Save', project);
  }

  getProject(projectId: string) {
    return this.apiService.get<IBaseResponse<IAddOrEditProjectResponse>>('services/app/Project/Get', { input: projectId });
  }
}
