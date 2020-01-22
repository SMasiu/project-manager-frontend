import { Injectable } from '@angular/core';
import { TeamType } from '../types/team.type';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { take, map } from 'rxjs/operators';
import { MemberType } from '../types/member.type';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TeamService } from './team.service';

const getMembersQuery = gql`
  query TeamMembers($id: ID!) {
    TeamMembers(id: $id) {
      user {
        name,
        surname,
        user_id,
        nick
      },
      permission
    }
  }
`

const inviteMemberQuery = gql`
  mutation AddTeamMember($teamId: ID!, $userId: ID!){
    AddTeamMember(teamId: $teamId, userId: $userId) {
      permission,
      user {
        name,
        nick,
        surname,
        user_id
      }
    }
  }
`

const kickMemberQuery = gql`
  mutation KickOutOfTheTeam($team_id: ID!, $user_id: ID!){
    KickOutOfTheTeam(team_id: $team_id, user_id: $user_id) {
      user {
        user_id
      }
    }
  }
`

const deleteTeamQuery = gql`
  mutation DeleteTeam($team_id: ID!) {
    DeleteTeam(team_id: $team_id) {
      team_id
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class TeamManagerService {

  team: TeamType;
  members: MemberType[];

  membersChanges: Subject<MemberType[]> = new Subject();

  constructor(private apollo: Apollo, private router: Router, private teamService: TeamService) {
  }

  setTeam(team: TeamType) {
    this.team = team;
  }

  setMembers(members: MemberType[]) {
    this.members = members;
    this.membersChanges.next(members);
  }

  addMember(member: MemberType) {
    this.members.push(member);
    this.teamService.addMemberToTeam(this.team.team_id);
    this.team.membersCount++;
    this.updateMembers();
  }

  removeMember(member_id: string) {
    const index = this.members.findIndex( m => m.user.user_id === member_id );
    if(index !== -1) {
      this.members.splice(index, 1);
      this.teamService.removeMemberFromTeam(this.team.team_id);      
      this.team.membersCount--;
      this.updateMembers();
    }
  }

  removeTeam() {
    this.teamService.removeTeam(this.team.team_id);
    this.members = [];
    this.team = undefined;
    this.router.navigateByUrl('/teams');
  }

  updateMembers() {
    this.teamService.teamMembers.set(this.team.team_id, this.members);
    this.membersChanges.next(this.members);
  }

  getMembers() {
    if(this.validate()) {
      let name = this.team.team_id;
      if(this.teamService.teamMembers.checkIfExists(name)) {
        return this.teamService.teamMembers.get(name);
      }
      
      this.apollo.watchQuery({
        query: getMembersQuery,
        variables: { id: this.team.team_id }
      }).valueChanges.pipe(
        take(1),
        map( (res: any) => res.data.TeamMembers )
      ).subscribe( members => {
        this.teamService.teamMembers.add(name, members);
        this.setMembers(members);
      });
    }
  }

  inviteMember(variables: {userId: string}) {
    if(this.validate()) {
      this.apollo.mutate({
        mutation: inviteMemberQuery,
        variables: {
          userId: variables.userId,
          teamId: this.team.team_id
        }
      }).pipe(
        take(1),
        map( (res: any) => res.data.AddTeamMember )
      ).subscribe( (member: MemberType) => {
        this.addMember(member);
      });
    }
  }

  validate() {
    if(!this.team) {
      this.router.navigateByUrl('/teams');
      return false;
    }
    return true;
  }

  kickMember(user_id: string) {
    if(this.validate()) {
      this.apollo.mutate({
        mutation: kickMemberQuery,
        variables: {
          user_id,
          team_id: this.team.team_id
        }
      }).pipe(
        take(1),
        map( (res: any) => res.data.KickOutOfTheTeam )
      ).subscribe(
        kicked => this.removeMember(kicked.user.user_id)
      );
    }
  }

  deleteTeam() {
    if(this.validate()) {
      this.apollo.mutate({
        mutation: deleteTeamQuery,
        variables: {
          team_id: this.team.team_id
        }
      }).pipe(take(1)).subscribe(
        team => {
          this.removeTeam();
        }
      );
    }
  }

}
