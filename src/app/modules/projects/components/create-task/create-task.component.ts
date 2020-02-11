import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  form: FormGroup;
  isUpdating: boolean = false;

  priorityOptions = [
    { value: 0, header: 'low' },
    { value: 1, header: 'medium' },
    { value: 2, header: 'high' }
  ];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService) { }  
  
  ngOnInit() {

    const { name, description, priority } = this.data.task;
    if(this.data.task && this.data.task.task_id) {
      this.isUpdating = true;
    }

    this.form = new FormGroup({
      name: new FormControl(name || '', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(description || '', [Validators.required, Validators.maxLength(5000)]),
      priority: new FormControl(priority || 0),
      column_id: new FormControl(this.data.defaultColumn)
    });

    if(!this.isUpdating) {
      this.form.controls.column_id.setValidators(Validators.required);
    }
  }

  handleClose() {
    this.dialogRef.close(false);
  }

  handleSubmit() {
    if(this.isUpdating) {
      const { name, description, priority }  = this.form.value;
      this.projectService.updateTask({name, description, priority, task_id: this.data.task.task_id});
    } else {
      this.projectService.createTask(this.form.value);
    }
    this.handleClose();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
