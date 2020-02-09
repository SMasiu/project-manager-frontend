import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ProjectType, FullProjectType, CreateProjectType } from '../types/project.type';
import { Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { getProjectsQuery, createProjectQuery } from '../query/project.query';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: ProjectType[] = [];
  projectChanges: Subject<ProjectType[]> = new Subject();

  downloaded: boolean = false;

  private fullProjects: { [key: string]: FullProjectType } = { };

  constructor(private apollo: Apollo, private router: Router) { }

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

  addProject(project: ProjectType) {
    this.projects.push(project);
    this.emitProjects();
  }

  createProject({name, description, team_id}: CreateProjectType) {
    let variables: {[key: string]: any} = {
      name,
      description
    };
    if(team_id !== '-1') {
      variables['team_id'] = team_id;
    }
    variables['owner_type'] = team_id !== '-1' ? 'team' : 'user';
    this.apollo.mutate({
      mutation: createProjectQuery,
      variables
    }).pipe(
      take(1),
      map( (res: any) => res.data.CreateProject )
    ).subscribe(
      project => {
        this.addProject(project);
        this.router.navigateByUrl('/projects');
      }
    );
  }

}
