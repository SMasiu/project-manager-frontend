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
          surname,
          nick,
          user_id
        }
      },
      friendInvitations {
        name,
        nick,
        surname,
        user_id
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

  getNotifications() {
    return {...this.notifications};
  }

  setNotifications(n) {
    this.notifications = n;
    this.emitNotifications();
  }

  emitNotifications() {
    this.notificationsChanges.next({...this.notifications});
  }

  downloadNotifications() {

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
      }
    )
  }
  
  removeTeamInvitation(team_id: string) {
    const index = this.notifications.teamInvitations.findIndex( t => t.team_id === team_id );
    if(index !== -1) {
      this.notifications.teamInvitations.splice(index, 1);
      this.emitNotifications();
    }
  }

}
