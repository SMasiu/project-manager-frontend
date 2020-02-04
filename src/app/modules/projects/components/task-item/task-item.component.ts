import { Component, OnInit, Input } from '@angular/core';
import { TaskType } from '../../types/project.type';
import { UserType } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: TaskType;

  usersToDisplay: UserType[] = [];

  constructor() { }

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

}
