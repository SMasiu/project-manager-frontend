import { Injectable } from '@angular/core';
import { TeamType } from '../types/team.type';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { take, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CacheAsyncQuery } from 'src/app/shared/classes/cache-async-query';
import { NotificationService } from 'src/app/shared/services/notification.service';

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

const acceptInvitationQuery = gql`
  mutation AcceptTeamInvitation($team_id: ID!) {
    AcceptTeamInvitation(team_id: $team_id) {
      permission,
    }
  }
`

const rejectInvitationQuery = gql`
  mutation LeaveTeam($team_id: ID!) {
    LeaveTeam(team_id: $team_id) {
      permission
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

  teamMembers = new CacheAsyncQuery();

  alredyInvitedMembersTeams: {[key: string]: string[]} = {}

  constructor(private apollo: Apollo, private notificationService: NotificationService) { }

  addAlredyInvitedMembersTeams(id: string, data: string[]) {
    this.alredyInvitedMembersTeams[id] = data;
  }

  getAlredyInvitedMembersTeams(id: string) {
    if(this.alredyInvitedMembersTeams[id]) {
      return [...this.alredyInvitedMembersTeams[id]];
    }
    return [];
  }

  setTeams(teams) {
    this.teams = teams;
    this.teamsChanges.next([...teams]);
  } 

  getTeams() {
    return [...this.teams];
  }

  getTeam(id: string) {
    let team = this.teams.find( t => t.team_id === id );
    return team ? {...team} : null;
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

  updateTeam(team: TeamType) {
    const index = this.teams.findIndex( t => t.team_id === team.team_id );
    this.teams.splice(index, 1, team);
    this.teamsChanges.next([...this.teams]);
  }

  addMemberToTeam(team_id: string) {
    this.changeTeamMambersCount(team_id, 1);
  }

  removeMemberFromTeam(team_id: string) {
    this.changeTeamMambersCount(team_id, -1);
  }
  
  changeTeamMambersCount(team_id: string, count: number) {
    let team = this.teams.find( t => t.team_id === team_id );
    if(team) {
      team.membersCount += count;
      this.teamsChanges.next([...this.teams]);
    }
  }

  removeTeam(team_id: string) {
    const index = this.teams.findIndex( t => t.team_id === team_id );
    if(index !== -1) {
      this.teamMembers.reomve(team_id);
      this.teams.splice(index, 1);
      this.teamsChanges.next([...this.teams]);
    }
  }
  
  acceptRequest(team: TeamType) {
    this.apollo.mutate({
      mutation: acceptInvitationQuery,
      variables: {
        team_id: team.team_id
      }
    }).pipe(take(1)).subscribe( 
      member => {
        this.addTeam(team);
        this.notificationService.removeTeamInvitation(team.team_id);
        this.addMemberToTeam(team.team_id);
      }
    );
  }

  rejectRequest(team_id: string) {
    this.apollo.mutate({
      mutation: rejectInvitationQuery,
      variables: {
        team_id
      }
    }).pipe(take(1)).subscribe( 
      member => {
        this.notificationService.removeTeamInvitation(team_id);
      }
    );
  }

}
