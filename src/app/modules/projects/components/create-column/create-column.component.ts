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
  isUpdating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService) { }  
  
  ngOnInit() {
    let name = '';
    if(this.data.column) {
      this.isUpdating = true;
      name = this.data.column.name;
    }

    this.form = new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.maxLength(50)])
    });
  }

  handleClose() {
    this.dialogRef.close(false);
  }

  handleSubmit() {
    if(this.isUpdating) {
      this.projectService.updateColumn(this.data.column.column_id, this.form.value);
    } else {
      this.projectService.createProject(this.form.value);
    }
    this.handleClose();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
