import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FullProjectType, ColumnType } from '../types/project.type';
import { ProjectsService } from './projects.service';
import { Apollo } from 'apollo-angular';
import { getProjectByIdQuery, createColumnQuery, createTaskQuery } from '../query/project.query';
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

  createProject({name}) {
    this.apollo.mutate({
      mutation: createColumnQuery,
      variables: { name , project_id: this.project.project_id }
    }).pipe(
      take(1),
      map( (res: any) => res.data.CreateColumn )
    ).subscribe( 
      col => {
        let column: ColumnType = {...col, tasks: []}
        this.project.columns.push(column);
        this.projectsService.setFullProject(this.project);
        this.emitProject();
      }
    );
  }

  createTask(task) {
    let variables = { ...task, project_id: this.project.project_id };
    variables.priority = parseInt(variables.priority);
    this.apollo.mutate({
      mutation: createTaskQuery,
      variables
    }).pipe(
      take(1),
      map( (res: any) => res.data.CreateTask )
    ).subscribe(
      newTask => {
        let index = this.project.columns.findIndex( c => c.column_id === task.column_id );
        if(index !== -1) {
          this.project.columns[index].tasks.push({...newTask, assignedUsers: []});
          this.projectsService.setFullProject(this.project);
          this.emitProject();
        }
      }
    );
  }
}
