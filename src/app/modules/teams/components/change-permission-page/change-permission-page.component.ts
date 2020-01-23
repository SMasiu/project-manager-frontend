import { Component, OnInit } from '@angular/core';
import { TeamManagerService } from '../../services/team-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MemberType } from '../../types/member.type';
import { UserService } from 'src/app/shared/services/user.service';
import { UserType } from 'src/app/shared/types/user.type';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-permission-page',
  templateUrl: './change-permission-page.component.html',
  styleUrls: ['./change-permission-page.component.scss']
})
export class ChangePermissionPageComponent implements OnInit {

  permission: number = 0;
  user_id: number;

  selectedMember: MemberType;

  members: MemberType[] = [];

  form: FormGroup;

  constructor(
    private teamManagerService: TeamManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.form = new FormGroup({
      permission: new FormControl('member')
    });

    this.route.queryParamMap.pipe(take(1)).subscribe(query => {
      this.permission = parseInt(query.get('permission'));

      let user_id = query.get('user');

      if (user_id) {
        this.selectedMember = this.teamManagerService.getMemberById(user_id);
      }

      this.filterMembers();

    });
  }

  filterMembers() {
    this.members = this.teamManagerService.members.filter(m => m.user.user_id !== this.userService.user.user_id && m.permission !== 3 && m.permission !== 0);
  }

  back() {
    this.router.navigateByUrl(`/teams/manage/${this.teamManagerService.team.team_id}`);
  }

  unselect() {
    this.selectedMember = undefined;
  }

  selectUser(member: MemberType) {
    this.selectedMember = member;
  }

  changePermission() {
    this.openLeaveDialog();
  }

  openLeaveDialog(): void {
    const { nick, surname } = this.selectedMember.user;
    const { permission } = this.form.value;
    const { user_id } = this.selectedMember.user;
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: 'auto',
      data: {
        text: `Do you realy want to change ${nick} ${surname} permission to ${permission}?`,
        successBtnText: 'Change'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(permission === 'owner') {
          this.teamManagerService.changeOwner(user_id);
        } else {
          this.teamManagerService.changePermission(user_id, permission === 'member' ? 1 : 2);
        }
      }
    });
  }

}
