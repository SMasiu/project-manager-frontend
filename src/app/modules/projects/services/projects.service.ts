import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ProjectType, FullProjectType } from '../types/project.type';
import { Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { getProjectsQuery } from '../query/project.query';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: ProjectType[] = [];
  projectChanges: Subject<ProjectType[]> = new Subject();

  downloaded: boolean = false;

  private fullProjects: { [key: string]: FullProjectType } = { };

  constructor(private apollo: Apollo) { }

  setFullProject(project: FullProjectType) {
    this.fullProjects[project.project_id] = project;
  }

  checkIfExistsFullProject(name: string): boolean {
    return this.fullProjects[name] ? true : false;
  }

  getFullProject(name: string): FullProjectType {
    return this.fullProjects[name];
  }

  downloadProjects() {
    if(!this.downloaded) {
      this.apollo.watchQuery<ProjectType[]>({
        query: getProjectsQuery
      }).valueChanges.pipe(
        take(1),
        map( (res: any) => res.data.GetProjects )
      ).subscribe(
        projects => {
          this.downloaded = true;
          this.projects = projects;
          this.emitProjects();
        }
      )
    }
  }

  getProjects() {
    return [...this.projects];
  }

  private emitProjects() {
    this.projectChanges.next(this.getProjects());
  }

}
