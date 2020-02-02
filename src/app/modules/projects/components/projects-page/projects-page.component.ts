import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ProjectType } from '../../types/project.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  projects: ProjectType[];
  projectsSubscription: Subscription;
  loading: boolean = true;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsSubscription = this.projectsService.projectChanges.subscribe( p => {
      this.projects = p;
      this.loading = false;
    });

    this.projects = this.projectsService.getProjects();
    if(this.projectsService.downloaded) {
      this.loading = false;
    }

    this.projectsService.downloadProjects();

  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }

}
