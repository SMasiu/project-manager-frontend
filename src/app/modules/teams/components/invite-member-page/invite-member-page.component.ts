import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/shared/types/user.type';
import { TeamManagerService } from '../../services/team-manager.service';

@Component({
  selector: 'app-invite-member-page',
  templateUrl: './invite-member-page.component.html',
  styleUrls: ['./invite-member-page.component.scss']
})
export class InviteMemberPageComponent implements OnInit {

  teamId: string;
  users: UserType[] = [];

  constructor(private teamManagerService: TeamManagerService, private router: Router) { }

  ngOnInit() {
    this.teamId = this.teamManagerService.team.team_id;
  }

  setUsers(users: UserType[]) {
    if(!(users instanceof Event)) {
      this.users = users;
    }
  }

  inviteUser(user: UserType) {
    this.teamManagerService.inviteMember({userId: user.user_id});
  }

  back() {
    this.router.navigateByUrl(`teams/manage/${this.teamId}`);
  }

  isInInvited(user_id: string) {
    return this.teamManagerService.alredyInvitedMembers.findIndex( a => a === user_id ) === -1;
  }

  cancelInvitation(user_id: string) {
    this.teamManagerService.kickMember(user_id);
  }

}
