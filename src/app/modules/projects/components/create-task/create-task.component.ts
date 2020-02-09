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
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
      priority: new FormControl(0),
      column_id: new FormControl(this.data.defaultColumn, [Validators.required])
    });
  }

  handleClose() {
    this.dialogRef.close(false);
  }

  handleSubmit() {
    this.projectService.createTask(this.form.value);
    this.handleClose();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
