import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskType } from '../../types/project.type';
import { UserType } from 'src/app/shared/types/user.type';
import { MatDialog } from '@angular/material';
import { AddUserToTaskComponent } from '../add-user-to-task/add-user-to-task.component';
import { MemberType } from 'src/app/modules/teams/types/member.type';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { ProjectService } from '../../services/project.service';
import { TaskFullItemComponent } from '../task-full-item/task-full-item.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: TaskType;
  @Input() members: MemberType[];
  @Output() updateTask: EventEmitter<TaskType> = new EventEmitter();

  usersToDisplay: UserType[] = [];

  constructor(public dialog: MatDialog, private projectService: ProjectService) { }

  ngOnInit() {
  }

  getClasses() {
    return `task-wrapper task-priority-${this.task.priority}`;
  }

  getUsers() {
    this.usersToDisplay = [];
    for(let i = 0; i < 3; i ++) {
      if(!this.task.assignedUsers[i] || i === 2 && this.task.assignedUsers.length > 3) {
        break;
      }
      this.usersToDisplay.push(this.task.assignedUsers[i]);
    }
    return this.usersToDisplay;
  }

  getFill() {
    if(this.task.assignedUsers.length < 3) {
      return this.task.assignedUsers.length === 1 ? [null,null] : [null];
    }
    return [];
  }

  openAddUserTaskDialog(): void {
    const dialogRef = this.dialog.open(AddUserToTaskComponent, {
      width: 'auto',
      data: {
        members: this.members,
        task: this.task
      }
    });
  }

  deleteTask() {
    if(this.task.assignedUsers.length) {
      this.openDeleteTaskDialog();
    } else {
      this.projectService.removeTask(this.task.task_id);
    }
  }

  openDeleteTaskDialog(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: 'auto',
      data: {
        members: this.members,
        task: this.task,
        text: `
          <h3 class="text-center">Are you sure to remove this task</h3>
          <div class="alert alert-danger">There are users assigned to this task</div>
        `,
        successBtnText: 'delete'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.projectService.removeTask(this.task.task_id);
      }
    });
  }

  openTaskReadMore() {
    const dialogRef = this.dialog.open(TaskFullItemComponent, {
      width: 'auto',
      data: {
        task: this.task
      }
    });
  }

  requestTaskUpdate() {
    this.updateTask.emit(this.task);
  }

}
