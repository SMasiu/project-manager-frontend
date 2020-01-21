import { Component, OnInit, Input, Inject } from '@angular/core';
import { MemberType } from '../../types/member.type';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserType } from 'src/app/shared/types/user.type';
import { TeamManagerService } from '../../services/team-manager.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() members: MemberType[];
  @Input() permission: number = 0;
  @Input() meId: string = '';

  constructor(public dialog: MatDialog, private teamManagerService: TeamManagerService) { }

  ngOnInit() {
  }

  kickOutOfTheTeam(member: UserType) {
    this.openDialog(member);
  }

  openDialog(user: UserType): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.teamManagerService.kickMember(user.user_id);
      }
    });
  }

}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleClick(value: boolean) {
    this.dialogRef.close(value);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}