import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../../projects/service/project.service';

@Component({
  selector: 'app-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss'],
})
export class ProjectLayoutComponent {
  isLoading = new Observable<boolean>();

  constructor(private projectService: ProjectService) {
    this.isLoading = this.projectService.isLoading;
  }


}
