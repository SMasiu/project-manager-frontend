import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FullProjectType } from '../types/project.type';
import { ProjectsService } from './projects.service';
import { Apollo } from 'apollo-angular';
import { getProjectByIdQuery } from '../query/project.query';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private project: FullProjectType;
  projectChanges: Subject<FullProjectType> = new Subject();

  constructor(private projectsService: ProjectsService, private apollo: Apollo) { }

  downloadProject(project_id: string) {
    if(this.projectsService.checkIfExistsFullProject(project_id)) {
      this.project = this.projectsService.getFullProject(project_id);
      this.emitProject();
    } else {
      this.apollo.watchQuery<FullProjectType>({
        query: getProjectByIdQuery,
        variables: { project_id }
      }).valueChanges.pipe(
        take(1),
        map( (res: any) => res.data.GetProject )
      ).subscribe( project => {
        this.project = project;
        this.emitProject();
      });
    }
  }

  private emitProject() {
    this.projectChanges.next(this.getProject());
  }

  getProject() {
    if(this.project) {
      return {...this.project};
    }
    return null;
  }
}
