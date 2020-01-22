import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/shared/types/notification.type';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  notifications: NotificationType;
  notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
    this.notificationSubscription = this.notificationService.notificationsChanges.subscribe( n => this.notifications = n );
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

}
