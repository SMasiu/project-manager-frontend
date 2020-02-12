import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/shared/types/notification.type';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Subscription } from 'rxjs';
import { TeamType } from 'src/app/modules/teams/types/team.type';
import { TeamService } from 'src/app/modules/teams/services/team.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  notifications: NotificationType;
  notificationSubscription: Subscription;

  teams: TeamType[];

  constructor(private notificationService: NotificationService, private teamService: TeamService) { }

  ngOnInit() {
    this.notificationSubscription = this.notificationService.notificationsChanges.subscribe( n => this.notifications = n );
    this.notifications = this.notificationService.getNotifications();

    this.teamService.teamsChanges.subscribe(t => {
      this.teams = t;
    });
    this.teamService.downloadTeams();
    this.teams = this.teamService.getTeams();
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

}
