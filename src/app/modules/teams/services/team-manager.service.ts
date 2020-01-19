import { Injectable } from '@angular/core';
import { TeamType } from '../types/team.type';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { take, map } from 'rxjs/operators';
import { MemberType } from '../types/member.type';
import { Subject } from 'rxjs';

const getMembersQuery = gql`
  query TeamMembers($id: ID!) {
    TeamMembers(id: $id) {
      user {
        name,
        surname,
        user_id,
        nick
      },
      permission,
      accepted
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

  constructor(private apollo: Apollo) { }

  setTeam(team: TeamType) {
    this.team = team;
  }

  setMembers(members) {
    this.members = members;
    this.membersChanges.next(members);
  }

  getMembers() {
    this.apollo.watchQuery({
      query: getMembersQuery,
      variables: { id: this.team.team_id }
    }).valueChanges.pipe(
      take(1),
      map( (res: any) => res.data.TeamMembers )
    ).subscribe( members => {
      this.setMembers(members);
    });
  }
}
