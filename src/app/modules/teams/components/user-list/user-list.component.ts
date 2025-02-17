import { Component, OnInit, Input } from '@angular/core';
import { MemberType } from '../../types/member.type';
import { MatDialog } from '@angular/material';
import { UserType } from 'src/app/shared/types/user.type';
import { TeamManagerService } from '../../services/team-manager.service';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() members: MemberType[];
  @Input() permission: number = 0;
  @Input() meId: string = '';

  constructor(public dialog: MatDialog, private teamManagerService: TeamManagerService, private router: Router) { }

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

  openLeaveDialog(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: 'auto',
      data: {
        text: `Do you realy want to leave?`,
        successBtnText: 'Leave'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.teamManagerService.leaveTeam();
      }
    });
  }

  changePermission(user: UserType) {
     this.router.navigateByUrl(`/teams/change-permission?permission=${this.permission}&user=${user.user_id}`);
  }

  seeProfile(user_id: string) {
    this.router.navigateByUrl(`/profile/${user_id}`);
  }

}