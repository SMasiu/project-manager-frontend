import { Component, OnInit, Input } from '@angular/core';
import { TaskType } from '../../types/project.type';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: TaskType;

  constructor() { }

  ngOnInit() {
  }

}
