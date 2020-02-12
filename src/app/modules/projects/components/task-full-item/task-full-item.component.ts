import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskType } from '../../types/project.type';

@Component({
  selector: 'app-task-full-item',
  templateUrl: './task-full-item.component.html',
  styleUrls: ['./task-full-item.component.scss']
})
export class TaskFullItemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskType }) { }  
  
  ngOnInit() {
    
  }

  handleClose() {
    this.dialogRef.close(false);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
