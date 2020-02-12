import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/shared/types/notification.type';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Subscription } from 'rxjs';
import { TeamType } from 'src/app/modules/teams/types/team.type';
import { TeamService } from 'src/app/modules/teams/services/team.service';
import { ProjectType } from 'src/app/modules/projects/types/project.type';
import { ProjectsService } from 'src/app/modules/projects/services/projects.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  notifications: NotificationType;
  notificationSubscription: Subscription;

  teams: TeamType[];
  projects: ProjectType[];

  teamSubscription: Subscription;
  projectSubscription: Subscription;

  constructor(private notificationService: NotificationService, private teamService: TeamService, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.notificationSubscription = this.notificationService.notificationsChanges.subscribe( n => this.notifications = n );
    this.notifications = this.notificationService.getNotifications();

    this.teamSubscription = this.teamService.teamsChanges.subscribe(t => {
      this.teams = t;
    });
    this.teamService.downloadTeams();
    this.teams = this.teamService.getTeams();

    this.projectSubscription = this.projectsService.projectChanges.subscribe( p => {
      this.projects = p;
    });
    this.projectsService.downloadProjects();
    this.projects = this.projectsService.getProjects();
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
    this.teamSubscription.unsubscribe();
  }

}
