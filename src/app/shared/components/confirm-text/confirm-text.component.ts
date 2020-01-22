import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isSameValidator } from '../../validators/is-same.validator';

@Component({
  selector: 'app-confirm-text',
  templateUrl: './confirm-text.component.html',
  styleUrls: ['./confirm-text.component.scss']
})
export class ConfirmTextComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }  
  
  ngOnInit() {
    this.form = new FormGroup({
      match: new FormControl('', [isSameValidator(this.data.match)])
    });
  }

  handleClose() {
    this.dialogRef.close(false);
  }

  handleSubmit() {
    this.dialogRef.close(this.form.valid);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
