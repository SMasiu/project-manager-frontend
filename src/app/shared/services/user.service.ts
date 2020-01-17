import { Injectable } from '@angular/core';
import { MeType } from '../types/user.type';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

interface CheckStatusType {
  CheckUserStatus: {
    logged: boolean;
    me: MeType
  }
}

const checkUserStatusQuery = gql`
  {
    CheckUserStatus {
      logged,
      me {
        user_id,
        nick,
        name,
        surname,
        email
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: MeType = {
    id: '-1',
    name: '',
    surname: '',
    nick: '',
    email: ''
  };
  logged: boolean = false;
  loggedChanges: Subject<boolean> = new Subject();
  userChanges: Subject<MeType> = new Subject();

  constructor(private apollo: Apollo, private router: Router) { }

  setUser(user: MeType) {
    this.user = { ...this.user, ...user };
    this.userChanges.next(this.user);
  }

  setLogged(logged) {
    this.logged = logged;
    this.loggedChanges.next(logged);
  }

  checkUserStatus() {
    this.apollo.watchQuery<CheckStatusType>({
      query: checkUserStatusQuery
    }).valueChanges.pipe(
      take(1),
      map( (res) => res.data.CheckUserStatus )
      ).subscribe(
      ({me, logged}) => {
        if(logged) {
          this.setUser(me);
          this.setLogged(true);
          this.router.navigateByUrl('/teams/create');
        }
      }
    );
  }

}
