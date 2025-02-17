import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserType } from '../types/user.type';
import { CacheQueriesService } from './cache-queries.service';
import { QueryOptionsType } from '../types/get-user.type';

const getUsersQuery = gql`
  query GetUsersAndCount($limit: Int!, $offset: Int!, $fullname: String!, $team_id: ID!, $friends: Boolean!) {
    GetUsersAndCount(fullname: $fullname, limit: $limit, offset: $offset, team_id: $team_id, friends: $friends) {
      users {
        name,
        surname,
        user_id,
        nick
      },
      count
    }
  }
`

interface UsersAndCountType {
  users: UserType[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apollo: Apollo, private cacheQueriesService: CacheQueriesService) { }

  getUsers(args: QueryOptionsType = {}): Observable<UsersAndCountType> {
    return Observable.create( observer => {
      
      let { limit, offset, fullname, team_id, friends } = args;

      friends = (typeof friends !== 'boolean' && !friends) ? true : friends;

      let name = this.cacheQueriesService.nameFromGetUsersAndCount(args);
      const GetUsersAndCount = this.cacheQueriesService.GetUsersAndCount;

      if(GetUsersAndCount.checkIfExists(name)) {
        observer.next(GetUsersAndCount.get(name));
        return observer.complete();
      }

      this.apollo.watchQuery({
        query: getUsersQuery,
        variables: {
          offset: offset || 0,
          limit: limit || 25,
          fullname: fullname || '',
          team_id: team_id || '',
          friends: friends
        }
      }).valueChanges.pipe(
        take(1),
        map( (res: any) => res.data.GetUsersAndCount )
      ).subscribe( usersAndCount => {
        GetUsersAndCount.add(name, usersAndCount);
        observer.next(usersAndCount);
        return observer.complete();
      }); 
    })
  }
}
