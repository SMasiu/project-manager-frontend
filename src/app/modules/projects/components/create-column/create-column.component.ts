import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss']
})
export class CreateColumnComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService) { }  
  
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  handleClose() {
    this.dialogRef.close(false);
  }

  handleSubmit() {
    this.projectService.createProject(this.form.value);
    this.handleClose();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
