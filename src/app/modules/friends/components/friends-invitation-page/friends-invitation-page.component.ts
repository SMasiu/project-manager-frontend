import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserType } from 'src/app/shared/types/user.type';
import { Subscription } from 'rxjs';
import { FriendsService } from '../../services/friends.service';

@Component({
  selector: 'app-friends-invitation-page',
  templateUrl: './friends-invitation-page.component.html',
  styleUrls: ['./friends-invitation-page.component.scss']
})
export class FriendsInvitationPageComponent implements OnInit {

  friends: UserType[] = [];

  notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService, private friendsService: FriendsService) { }

  ngOnInit() {
    this.friends = this.notificationService.getNotifications().friendInvitations || [];
    this.notificationSubscription = this.notificationService.notificationsChanges.subscribe( n => this.friends = n.friendInvitations );
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

  accept(user_id: string) {
    this.friendsService.acceptInvitation(user_id);
  }

  reject(user_id: string) {
    this.friendsService.rejectInvitation(user_id);
  }

}
