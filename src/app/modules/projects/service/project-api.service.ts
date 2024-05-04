import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { IHttpParams } from 'src/app/interfaces/prams.interface';
import { IBaseResponse } from '../../authen/interfaces/login.interface';
import { ITaskOrTeamRequest, ITaskResponse, IUserResponse } from 'src/app/interfaces/tasks-team.interface';
import { IProjectFilterParams, IProjectResponse, IQuantityProjectResponse } from 'src/app/interfaces/project.interface';

@Injectable()
export class ProjectApiService {
  private getQuanlityProjectsUrl = 'services/app/Project/GetQuantityProject';
  private getAllProjectsUrl = 'services/app/Project/GetAll';
  private getTaskByProjectUrl = 'services/app/TimeSheetProject/GetTimeSheetStatisticTasks';
  private deleteProjectUrl = 'services/app/Project/Delete';
  private activeProjectUrl = 'services/app/Project/Active';
  private inactiveProjectUrl = 'services/app/Project/Inactive';
  private getTeamByProjectUrl = 'services/app/TimeSheetProject/GetTimeSheetStatisticTeams';

  constructor(private apiService: ApiService) { }

  getAllProjects(filter: IProjectFilterParams) {
    const params: IHttpParams = {
      status: filter.status,
      search: filter.search,
    };
    return this.apiService.get<IBaseResponse<IProjectResponse[]>>(this.getAllProjectsUrl, params);
  }

  getQuantityProjects(): Observable<IBaseResponse<IQuantityProjectResponse[]>> {
    return this.apiService.get<IBaseResponse<IQuantityProjectResponse[]>>(this.getQuanlityProjectsUrl);
  }

  deleteProject(id: number): Observable<IBaseResponse<IProjectResponse>> {
    return this.apiService.delete<IBaseResponse<IProjectResponse>>(this.deleteProjectUrl, { id: id.toString() });
  }

  activeProject(id: number): Observable<IBaseResponse<IProjectResponse>> {
    return this.apiService.post<IBaseResponse<IProjectResponse>>(this.activeProjectUrl, { id: id.toString() });
  }

  inactiveProject(id: number): Observable<IBaseResponse<IProjectResponse>> {
    return this.apiService.post<IBaseResponse<IProjectResponse>>(this.inactiveProjectUrl, { id: id.toString() });
  }

  getTeamByProject(teamRequest: ITaskOrTeamRequest): Observable<IBaseResponse<IUserResponse[]>> {
    const params: IHttpParams = {
      projectId: teamRequest.projectId.toString(),
      startDate: teamRequest.startDate,
      endDate: teamRequest.endDate,
    };
    return this.apiService.get<IBaseResponse<IUserResponse[]>>(this.getTeamByProjectUrl, params);
  }

  getTaskByProject(taskRequest: ITaskOrTeamRequest): Observable<IBaseResponse<ITaskResponse[]>> {
    const params: IHttpParams = {
      projectId: taskRequest.projectId.toString(),
      startDate: taskRequest.startDate,
      endDate: taskRequest.endDate,
    };
    return this.apiService.get<IBaseResponse<ITaskResponse[]>>(this.getTaskByProjectUrl, params);
  }

}
