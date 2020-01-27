import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { UserType } from 'src/app/shared/types/user.type';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

const getFriendsQuery = gql`
  {
    GetFriends {
      name,
      surname,
      user_id,
      nick
    }
  }
`

const deleteFriendQuery = gql`
  mutation DeleteFriend($user_id: ID!) {
    DeleteFriend(user_id: $user_id) {
      name,
      nick,
      user_id,
      surname
    }
  }
`

const inviteFriendQuery = gql`
  mutation InviteFriend($user_id: ID!) {
    InviteFriend(user_id: $user_id) {
      nick,
      name,
      surname,
      user_id
    }
  }
`

const rejectFriendInvitation = gql`
  mutation RejectFriendInvitation($user_id: ID!){
    RejectFriendInvitation(user_id: $user_id) {
      name,
      nick,
      surname,
      user_id
    }
  }
`

const acceptFriendInvitation = gql`
  mutation ($user_id: ID!){
    AcceptFriendInvitation(user_id: $user_id) {
      user_id,
      surname,
      name,
      nick
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  downloaded: boolean = false;

  friends: UserType[] = [];
  friendsChanges: Subject<UserType[]> = new Subject();

  constructor(private apollo: Apollo, private notificationService: NotificationService) { }

  getFriends() {
    return [...this.friends];
  }

  downloadFriends() {

    if (this.downloaded) {
      return false;
    }


    this.apollo.watchQuery({
      query: getFriendsQuery
    }).valueChanges.pipe(
      take(1),
      map((res: any) => res.data.GetFriends)
    ).subscribe(
      friends => {
        this.friends = friends;
        this.downloaded = true;
        this.emitFriends();
      }
    );
  }

  emitFriends() {
    this.friendsChanges.next([...this.friends]);
  }

  removeFriend(user_id: string) {
    this.apollo.mutate({
      mutation: deleteFriendQuery,
      variables: { user_id }
    }).pipe(
      take(1),
      map((res: any) => res.data.DeleteFriend)
    ).subscribe(deleted => {
      const index = this.friends.findIndex(f => f.user_id === user_id);
      if (index !== -1) {
        this.friends.splice(index, 1);
        this.emitFriends();
      }
    });
  }

  addFriend(friend: UserType) {
    this.friends.push(friend);
    this.emitFriends();
  }

  inviteFriend(user_id: string) {
    this.apollo.mutate({
      mutation: inviteFriendQuery,
      variables: { user_id }
    }).pipe(
      take(1),
    ).subscribe( friend => {
      console.log(friend);
    });
  }

  rejectInvitation(user_id: string) {
    this.apollo.mutate({
      mutation: rejectFriendInvitation,
      variables: { user_id }
    }).pipe(
      take(1),
      map( (res: any) => res.data.RejectFriendInvitation )
    ).subscribe( user => {
      this.notificationService.removeFriendInvitation(user.user_id);
    });
  }

  acceptInvitation(user_id: string) {
    this.apollo.mutate({
      mutation: acceptFriendInvitation,
      variables: { user_id }
    }).pipe(
      take(1),
      map( (res: any) => res.data.acceptFriendInvitation )
    ).subscribe( user => {
      this.addFriend(user);
      this.notificationService.removeFriendInvitation(user_id);
    });
  }

}
