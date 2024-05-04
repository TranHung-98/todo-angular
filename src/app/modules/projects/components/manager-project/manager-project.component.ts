import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EStatusFilter, EStatusFilterQueryParams } from 'src/app/enums/status-filter.enum';
import { IQuantityProjectResponse } from 'src/app/interfaces/project.interface';
import { ProjectApiService } from '../../service/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-manager-project',
  templateUrl: './manager-project.component.html',
  styleUrls: ['./manager-project.component.scss']
})
export class ManagerProjectComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  destroy$ = new Subject<void>();
  selectedFilter: string = EStatusFilter.ALL;
  searchTimeout!: ReturnType<typeof setTimeout>;
  quantityProjects: IQuantityProjectResponse[] = [];
  selectFilters = [EStatusFilter.ACTIVE, EStatusFilter.INACTIVE, EStatusFilter.ALL];

  constructor(private projectApiService: ProjectApiService, private router: Router, private activatedRoute: ActivatedRoute,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectApiService.getQuantityProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.quantityProjects = res?.result;
        this.quantityProjects.push({ quantity: this.quantityProjects[0]?.quantity + this.quantityProjects[1]?.quantity, status: 2 });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handerRefresh(): void {
    this.projectService.refreshProjectList$.next(true);
  }

  onSearchChange(): void {

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.handleFilter();
    }, 500);
  }

  handleFilter(): void {
    const filter: string = this.selectedFilter === EStatusFilter.ACTIVE ? EStatusFilterQueryParams.ACTIVE :
      this.selectedFilter === EStatusFilter.INACTIVE ? EStatusFilterQueryParams.INACTIVE :
        EStatusFilterQueryParams.ALL;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        status: filter,
        search: this.searchTerm,
      },
      queryParamsHandling: 'merge',
    });
  }
}
