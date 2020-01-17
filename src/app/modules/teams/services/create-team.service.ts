import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TeamType } from '../types/team.type';
import { TeamService } from './team.service';
import { UserService } from 'src/app/shared/services/user.service';

const createTeamQuery = gql`
  mutation CreateTeam($name: String!){
  CreateTeam(name: $name) {
    name,
    team_id,
    owner {
      name,
      surname,
      nick,
      user_id
    }
  }
}
`

@Injectable({
  providedIn: 'root'
})
export class CreateTeamService {

  constructor(private apollo: Apollo, private teamService: TeamService) { }

  createTeam(vars: {name: string}): Observable<TeamType> {
    return Observable.create( observer => {
      this.apollo.mutate({
        mutation: createTeamQuery,
        variables: vars
      }).pipe(
        take(1),
        map( ({data}) => (<any>data).CreateTeam )
      ).subscribe( (team: TeamType) => {
        this.teamService.addTeam(team);
        observer.next(team);
        return observer.complete();
      });
    });
  }
}
