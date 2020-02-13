import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FullProjectType, ColumnType, TaskType } from '../types/project.type';
import { ProjectsService } from './projects.service';
import { Apollo } from 'apollo-angular';
import { getProjectByIdQuery, createColumnQuery, createTaskQuery, moveTaskQuery, addUserToTask, removeUserFromTask, removeTaskQuery, updateTaskQuery, deleteColumnQuery, updateColumnQuery, changeColumnPositionQuery, deleteProjectQuery, toogleOpenProjectQuery, updateOwnerTypeQuery } from '../query/project.query';
import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private project: FullProjectType;
  projectChanges: Subject<FullProjectType> = new Subject();

  constructor(private projectsService: ProjectsService, private apollo: Apollo, private router: Router) { }

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

  moveTask(task_id: string, column_id: string) {
    this.apollo.mutate({
      mutation: moveTaskQuery,
      variables: {
        project_id: this.project.project_id,
        task_id,
        column_id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.MoveTask )
    ).subscribe(
      task => {
        return true;
      }
    );
  }

  addUserToTask(task_id: string, user_id: string) {
    this.apollo.mutate({
      mutation: addUserToTask,
      variables: {
        task_id,
        user_id,
        project_id: this.project.project_id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.AddUserToTask )
    ).subscribe(
      user => {
        let task = this.getTaskLocal(task_id) 

        if(task) {
          task.assignedUsers.push(user);
          this.projectsService.setFullProject(this.project);
          this.emitProject();
        }
      }
    )
  }

  private getTaskLocal(task_id: string): TaskType | null {
    let colIndex = this.getColumnIndex(task_id);
      if(colIndex !== -1) {
        let task = this.project.columns[colIndex].tasks.find( t => t.task_id === task_id );
        return task;
      }
      return null;
  }

  private getColumnIndex(task_id: string): number {
    return this.project.columns.findIndex( c => c.tasks.find(t => t.task_id === task_id) );
  }

  private findTaskIndex(columnIndex: number, task_id: string): number {
    return this.project.columns[columnIndex].tasks.findIndex( t => t.task_id === task_id );
  }

  removeUserFromTask(task_id: string, user_id: string) {
    this.apollo.mutate({
      mutation: removeUserFromTask,
      variables: {
        task_id,
        user_id,
        project_id: this.project.project_id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.DeleteUserFromTask )
    ).subscribe(
      user => {
        let task = this.getTaskLocal(task_id);
        if(task) {
          let index = task.assignedUsers.findIndex(t => t.user_id === user_id);
          if(index !== -1) {
            task.assignedUsers.splice(index, 1);
            this.projectsService.setFullProject(this.project);
            this.emitProject();
          }
        }
      }
    )
  }

  removeTask(task_id: string) {
    this.apollo.mutate({
      mutation: removeTaskQuery,
      variables: {
        task_id,
        project_id: this.project.project_id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.DeleteTask )
    ).subscribe(
      task => {
        let index = this.getColumnIndex(task_id);
        let taskIndex = this.findTaskIndex(index, task_id)

        this.project.columns[index].tasks.splice(taskIndex, 1);
        this.projectsService.setFullProject(this.project);
        this.emitProject();
      }
    )
  }

  updateTask({name, description, priority, task_id}) {
    this.apollo.mutate({
      mutation: updateTaskQuery,
      variables: {
        name,
        description,
        priority: parseInt(priority),
        task_id,
        project_id: this.project.project_id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.UpdateTask )
    ).subscribe(
      task => {
        let colIndex = this.getColumnIndex(task.task_id);
        let taskIndex = this.findTaskIndex(colIndex, task.task_id);

        this.project.columns[colIndex].tasks.splice(taskIndex, 1, task);
        this.projectsService.setFullProject(this.project);
        this.emitProject();
      }
    );
  }

  deleteColumn(column_id: string) {
    this.apollo.mutate({
      mutation: deleteColumnQuery,
      variables: {
        column_id,
        project_id: this.project.project_id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.DeleteColumn )
    ).subscribe(
      column => {
        const index = this.project.columns.findIndex( c => c.column_id === column.column_id );
        if(index !== -1) {
          this.project.columns.splice(index, 1);
          this.projectsService.setFullProject(this.project);
          this.emitProject();
        }
      }
    );
  }

  updateColumn(column_id: string, {name}) {
    this.apollo.mutate({
      mutation: updateColumnQuery,
      variables: {
        column_id,
        name,
        project_id: this.project.project_id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.UpdateColumn )
    ).subscribe(
      column => {
        let col = this.project.columns.find( c => c.column_id === column_id );
        col.name = name;
        this.projectsService.setFullProject(this.project);
        this.emitProject();
      }
    );
  }

  moveColumn(column_id: string, position: number) {
    this.apollo.mutate({
      mutation: changeColumnPositionQuery,
      variables: {
        column_id,
        position,
        project_id: this.project.project_id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.ChangeColumnPosition )
    ).subscribe(
      col => {
        return col;
      }
    )
  }

  deleteProject() {
    this.apollo.mutate({
      mutation: deleteProjectQuery,
      variables: {
        project_id: this.project.project_id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.DeleteProject )
    ).subscribe(
      project => {
        this.projectsService.removeProject(this.project.project_id);
        this.project = null;
        this.router.navigateByUrl('/projects');
      }
    )
  }

  toogleOpenProject() {
    this.apollo.mutate({
      mutation: toogleOpenProjectQuery,
      variables: {
        project_id: this.project.project_id,
        open: !this.project.open
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.ToogleOpenProject )
    ).subscribe(
      () => {
        this.project.open = !this.project.open;
        this.projectsService.setFullProject(this.project);
        this.emitProject();
      }
    )
  }

  changeOwnerType(owner_type: string, team_id: string) {
    this.apollo.mutate({
      mutation: updateOwnerTypeQuery,
      variables: {
        project_id: this.project.project_id,
        team_id,
        owner_type
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.ChangeProjectOwnerType )
    ).subscribe(
      project => {
        this.project = {...this.project, ...project};
        this.projectsService.setFullProject(this.project);
        this.emitProject();
        this.router.navigateByUrl(`/projects/manage/${this.project.project_id}`);
      }
    )
  }

}
