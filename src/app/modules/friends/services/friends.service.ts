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

    if(this.downloaded) {
      return false;
    }


    this.apollo.watchQuery({
      query: getFriendsQuery
    }).valueChanges.pipe(
      take(1),
      map( (res: any) => res.data.GetFriends )
    ).subscribe(
      friends => {
        this.friends = friends;
        this.friendsChanges.next([...this.friends]);
        this.downloaded = true;
      }
    );
  }
}
