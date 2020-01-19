import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserType } from '../types/user.type';

const getUsersQuery = gql`
  query Users {
    Users {
      user_id,
      name,
      surname,
      nick
    }
  }
`
interface QueryOptionsType {
  offset?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apollo: Apollo) { }

  getUsers({ limit, offset }: QueryOptionsType = {}): Observable<UserType[]> {
    return Observable.create( observer => {
      this.apollo.watchQuery({
        query: getUsersQuery
      }).valueChanges.pipe(
        take(1),
        map( (res: any) => res.data.Users )
      ).subscribe( users => {
        observer.next(users);
        return observer.complete();
      }); 
    })
  }
}
