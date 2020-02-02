import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ProjectType } from '../types/project.type';
import { Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';

const getProjectsQuery = gql`
  {
    GetProjects {
      project_id,
      open,
      name,
      description,
      owner_type,
      team {
        team_id,
        name,
        membersCount,
        owner {
          name,
          nick,
          surname,
          user_id
        }
      },
      creator {
        name,
        surname,
        nick,
        user_id
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: ProjectType[] = [];
  projectChanges: Subject<ProjectType[]> = new Subject();

  downloaded: boolean = false;

  constructor(private apollo: Apollo) { }

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
