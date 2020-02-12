import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '../../services/project.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ColumnType } from '../../types/project.type';

@Component({
  selector: 'app-column-order',
  templateUrl: './column-order.component.html',
  styleUrls: ['./column-order.component.scss']
})
export class ColumnOrderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService) { }  
    
  lastDragedColumn: ColumnType;

  ngOnInit() {
  }

  handleClose() {
    this.dialogRef.close(false);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  setDragged(col: ColumnType) {
    this.lastDragedColumn = col;
  }

  drop(event: CdkDragDrop<ColumnType[]>) {
    let position = event.currentIndex;
    if(event.previousIndex < event.currentIndex) {
      position ++;
    }
    this.projectService.moveColumn(this.lastDragedColumn.column_id, position);
    moveItemInArray(this.data.columns, event.previousIndex, event.currentIndex);
  }

}
