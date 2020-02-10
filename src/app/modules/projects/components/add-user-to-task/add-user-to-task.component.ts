import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserType } from 'src/app/shared/types/user.type';
import { ProjectService } from '../../services/project.service';
import { TaskType } from '../../types/project.type';
import { MemberType } from 'src/app/modules/teams/types/member.type';

@Component({
  selector: 'app-add-user-to-task',
  templateUrl: './add-user-to-task.component.html',
  styleUrls: ['./add-user-to-task.component.scss']
})
export class AddUserToTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskType, members: MemberType[] },
    private projectService: ProjectService) { }  
  
  ngOnInit() {
    
  }

  handleClose() {
    this.dialogRef.close(false);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  addUser(user: UserType) {
    this.projectService.addUserToTask(this.data.task.task_id, user.user_id);
  }

  removeUserFromTask(user: UserType) {
    this.projectService.removeUserFromTask(this.data.task.task_id, user.user_id);
  }

  getFiltredUsers() {
    return this.data.members.filter( m => m.permission !== 0 );
  }

  isInTask(user_id: string) {
    return this.data.task.assignedUsers.findIndex( u => u.user_id === user_id) === -1;
  }
}
