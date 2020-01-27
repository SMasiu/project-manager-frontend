import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { UserType } from 'src/app/shared/types/user.type';
import { Subject } from 'rxjs';

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
      to {
        nick,
        name,
        surname,
        user_id
      }
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

  constructor(private apollo: Apollo) { }

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

}
