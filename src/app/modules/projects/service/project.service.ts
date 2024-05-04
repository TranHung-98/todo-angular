import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EStatusFilterQueryParams } from 'src/app/enums/status-filter.enum';
import { IProjectFilterParams } from 'src/app/interfaces/project.interface';

@Injectable()
export class ProjectService {
  public isLoading = new BehaviorSubject<boolean>(false);
  constructor() { }

  refreshProjectList$ = new BehaviorSubject<boolean>(true);
  filter$ = new BehaviorSubject<IProjectFilterParams>({
    status: EStatusFilterQueryParams.ACTIVE,
    search: ''
  });
}
