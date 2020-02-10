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
import { TeamService } from 'src/app/modules/teams/services/team.service';
import { TeamManagerService } from 'src/app/modules/teams/services/team-manager.service';
import { MemberType } from 'src/app/modules/teams/types/member.type';

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
    private teamService: TeamService,
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
      this.teamManagerService.membersChanges.subscribe(m => {this.teamMembers = m; console.log(this.teamMembers)});

      this.teamManagerService.setTeam(this.project.team);
      this.teamManagerService.getMembers();

      this.teamMembers = [...this.teamManagerService.members];
      console.log(this.teamMembers)
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

  openCreateColumnDialog(): void {
    const dialogRef = this.dialog.open(CreateColumnComponent, {
      width: 'auto',
    });
  }

  openCreateTaskDialog(column_id: string = null): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: 'auto',
      data: {
        columns: this.project.columns,
        defaultColumn: column_id
      }
    });
  }

}
