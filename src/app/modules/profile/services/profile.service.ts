import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { take, map } from 'rxjs/operators';

const getUserByIdQuery = gql`
  query User($id: ID!) {
    User(id: $id) {
      name
      nick
      surname
      user_id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apollo: Apollo) { }

  getUserById(id: string) {
    return this.apollo.query({
      query: getUserByIdQuery,
      variables: {
        id
      }
    }).pipe(
      take(1),
      map( (res: any) => res.data.User )
    );
  }
  
}
