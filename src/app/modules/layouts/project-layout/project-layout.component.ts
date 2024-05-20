import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../../projects/service/project.service';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss'],
})
export class ProjectLayoutComponent {
  isLoading = new Observable<boolean>();

  constructor(private projectService: ProjectService, public layoutService: LayoutService) {
    this.isLoading = this.projectService.isLoading;
  }

  handleHideSidebarLeft() {
    if (window.innerWidth <= 1170) {
      this.layoutService.showSidebarLeft = true;
    }
  }
}
