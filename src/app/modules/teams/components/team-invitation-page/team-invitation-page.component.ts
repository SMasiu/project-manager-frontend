import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamType } from '../../types/team.type';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/types/notification.type';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-invitation-page',
  templateUrl: './team-invitation-page.component.html',
  styleUrls: ['./team-invitation-page.component.scss']
})
export class TeamInvitationPageComponent implements OnInit {

  invitedTeams: TeamType[] = [];
  notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService, private teamService: TeamService) { }

  ngOnInit() {
    this.setTeams(this.notificationService.getNotifications());
    this.notificationSubscription = this.notificationService.notificationsChanges.subscribe( n => this.setTeams(n) );
  }

  setTeams(n: NotificationType) {
    if(n.teamInvitations) {
      this.invitedTeams = n.teamInvitations;
    }
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

  accept(team: TeamType) {
    this.teamService.acceptRequest(team);
  }

  reject(team: TeamType) {
    this.teamService.rejectRequest(team.team_id);
  }

}
