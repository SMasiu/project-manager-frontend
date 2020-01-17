import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TeamType, NewTeamType } from '../types/team.type';
import { TeamService } from './team.service';
import { UserService } from 'src/app/shared/services/user.service';

const createTeamQuery = gql`
  mutation CreateTeam($name: String!){
  CreateTeam(name: $name) {
    name,
    team_id,
    owner
  }
}
`

@Injectable({
  providedIn: 'root'
})
export class CreateTeamService {

  constructor(private apollo: Apollo, private teamService: TeamService, private userService: UserService) { }

  createTeam(vars: {name: string}): Observable<any> {
    return Observable.create( observer => {
      this.apollo.mutate({
        mutation: createTeamQuery,
        variables: vars
      }).pipe(
        take(1),
        map( ({data}) => (<any>data).CreateTeam )
      ).subscribe( (team: NewTeamType) => {
        const {user_id, name, surname, nick} = this.userService.user;

        this.teamService.addTeam({
          team_id: team.team_id,
          membersCount: 1,
          name: team.name,
          owner: {
            user_id,
            name,
            surname,
            nick
          }
        });
        observer.next(team);
        return observer.complete();
      });
    });
  }
}
