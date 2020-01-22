import { Component, OnInit, Input, Inject } from '@angular/core';
import { MemberType } from '../../types/member.type';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserType } from 'src/app/shared/types/user.type';
import { TeamManagerService } from '../../services/team-manager.service';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';

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
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: 'auto',
      data: {
        text: `Are you sure to kick ${user.name} ${user.surname}?`,
        successBtnText: 'Kick'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.teamManagerService.kickMember(user.user_id);
      }
    });
  }

}