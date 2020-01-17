import { Injectable } from '@angular/core';
import { TeamType } from '../types/team.type';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const getTeamsQuery = gql`
  {
    Teams {
      team_id,
      name,
      membersCount,
      owner {
        user_id,
        surname,
        name,
        nick
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private downloaded: boolean = false;
  private teams: TeamType[] = [];
  teamsChanges: Subject<TeamType[]> = new Subject();

  constructor(private apollo: Apollo) { }

  setTeams(teams) {
    this.teams = teams;
    this.teamsChanges.next([...teams]);
  } 

  getTeams() {
    return [...this.teams];
  }

  downloadTeams() {
    if(!this.downloaded) {
      this.apollo.watchQuery({
        query: getTeamsQuery
      }).valueChanges.pipe(
        take(1),
        map( ({data}) => (<any>data).Teams )
        ).subscribe(t => {
          this.downloaded = true;
          this.setTeams(t)
        });
    }
  }

  addTeam(team: TeamType) {
    this.teams.push(team);
    this.teamsChanges.next([...this.teams]);
  }
}
