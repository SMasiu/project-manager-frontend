import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationType } from '../types/notification.type';

const getNotifications = gql`
  {
    GetNotifications {
      teamInvitations {
        team_id,
        name,
        membersCount,
        owner {
          name,
        }
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: NotificationType;
  notificationsChanges: Subject<NotificationType> = new Subject();

  private downloaded: boolean = false;

  constructor(private apollo: Apollo) { }

  setNotifications(n) {
    this.notifications = n;
    this.notificationsChanges.next(n);
  }

  getNotifications() {

    if(this.downloaded) {
      return;
    }

    this.apollo.query({
      query: getNotifications
    }).pipe(
      take(1),
      map( (res: any) => res.data.GetNotifications )
    ).subscribe(
      notifications => {
        this.downloaded = true;
        this.setNotifications(notifications);
        console.log(notifications)
      }
    )
  }
  
}
