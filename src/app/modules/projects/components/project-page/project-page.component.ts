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

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  project: FullProjectType;
  projectSubscription: Subscription;

  loading: boolean = true;
  lastDraggedTask: TaskType;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      
      const project_id = params.get('id');

      this.projectSubscription = this.projectService.projectChanges.subscribe( p => {
        this.project = p;
        this.loading = false;
        this.sortTasks();
      });
      
      this.projectService.downloadProject(project_id);
      
      this.project = this.projectService.getProject();
      if(this.project) {
        this.loading = false;
        this.sortTasks();
      }
    });
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
