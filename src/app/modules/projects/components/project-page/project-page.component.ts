import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ProjectService } from '../../services/project.service';
import { FullProjectType  , TaskType, ColumnType } from '../../types/project.type';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CreateColumnComponent } from '../create-column/create-column.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TeamManagerService } from 'src/app/modules/teams/services/team-manager.service';
import { MemberType } from 'src/app/modules/teams/types/member.type';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  project: FullProjectType;
  projectSubscription: Subscription;
  teamMembers: MemberType[] = [];

  loading: boolean = true;
  lastDraggedTask: TaskType;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private teamManagerService: TeamManagerService) { }

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      
      const project_id = params.get('id');

      this.projectSubscription = this.projectService.projectChanges.subscribe( p => {
        this.project = p;
        this.loading = false;
        this.sortTasks();
        this.afterProjectGet();
      });
      
      this.projectService.downloadProject(project_id);
      
      this.project = this.projectService.getProject();
      if(this.project) {
        this.loading = false;
        this.sortTasks();
        this.afterProjectGet();
      }

    });
  }

  afterProjectGet() {
    if(this.project.team && !this.teamMembers.length) {
      this.teamManagerService.membersChanges.subscribe( m => this.teamMembers = m );

      this.teamManagerService.setTeam(this.project.team);
      this.teamManagerService.getMembers();

      this.teamMembers = [...this.teamManagerService.members];
    }
  }

  getWidth() {
    return (this.project.columns.length + 1) * (325 + 40) + 40;
  }

  setDraggedTask(task: TaskType) {
    this.lastDraggedTask = task;
  }

  dropTask(event: CdkDragDrop<TaskType[]>, col: ColumnType) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.projectService.moveTask(this.lastDraggedTask.task_id, col.column_id);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

  sortTasks() {
    this.project.columns = this.project.columns
      .map( c => {
        c.tasks.sort((a,b) => a.priority > b.priority ? -1 : 1); 
        return c;
      });
  }

  openCreateColumnDialog(column: ColumnType = null): void {
    const dialogRef = this.dialog.open(CreateColumnComponent, {
      width: 'auto',
      data: {
        column
      }
    });
  }

  createColumn() {
    this.openCreateColumnDialog();
  }

  updateColumn(column: ColumnType) {
    this.openCreateColumnDialog(column);
  }

  openCreateTaskDialog(column_id: string = null, task: TaskType | any = { }): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: 'auto',
      data: {
        columns: this.project.columns,
        defaultColumn: column_id,
        task
      }
    });
  }

  createTask(column_id: string = null): void {
    this.openCreateTaskDialog(column_id);
  }

  handleUpdateTask(task: TaskType) {
    this.openCreateTaskDialog(null, task);
  }

  deleteColumn({column_id, tasks}: ColumnType) {
    if(tasks.length) {
      this.openDeleteColumnDialog(column_id);
    } else {
      this.projectService.deleteColumn(column_id);
    }
  }

  openDeleteColumnDialog(column_id: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: 'auto',
      data: {
        successBtnText: 'delete',
        text: `
          <h2 class="text-center">Are you sure to remove this column</h2>
          <div class="alert alert-danger">There are tasks in this column</div>
        `
      }
    });

    dialogRef.afterClosed().subscribe( res => {
      if(res) {
        this.projectService.deleteColumn(column_id);
      }
    });
  }

}
