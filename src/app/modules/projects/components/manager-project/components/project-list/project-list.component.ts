import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IProjectResponse } from 'src/app/interfaces/project.interface';
import { Subscription, combineLatest, debounceTime, switchMap, tap } from 'rxjs';
import { ProjectService } from 'src/app/modules/projects/service/project.service';
import { ProjectApiService } from 'src/app/modules/projects/service/project-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnDestroy, OnInit {
  loading: boolean = false;
  @Input() searchTerm: string = '';
  projectListRefresh!: Subscription;
  queryParamsSubscription!: Subscription;
  projectList: Map<string, IProjectResponse[]> = new Map();

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private projectApiService: ProjectApiService,
  ) { }

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      const status = params['status'] || '';
      const search = params['search'] || '';
      if (status !== undefined && search !== undefined) {
        this.projectService.filter$.next({ status, search });
      }
    });

    this.projectListRefresh = combineLatest([this.projectService.refreshProjectList$, this.projectService.filter$])
      .pipe(
        debounceTime(300),
        tap(() => this.loading = true),
        switchMap(([, payload]) => this.projectApiService.getAllProjects(payload))
      ).subscribe({
        next: (res) => {
          if (res?.result) {
            this.updateProjectList(res.result);
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.projectListRefresh.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }

  private updateProjectList(projects: IProjectResponse[]): void {
    this.projectList = projects.reduce((p, project) => {
      const existingProjects = p.get(project.customerName);
      if (existingProjects) {
        existingProjects.push(project);
      } else {
        p.set(project.customerName, [project]);
      }
      return p;
    }, new Map<string, IProjectResponse[]>());
  }

}
