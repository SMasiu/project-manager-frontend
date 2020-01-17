import { Injectable } from '@angular/core';
import { TeamType } from '../types/team.type';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getMembersQuery = gql`

`

@Injectable({
  providedIn: 'root'
})
export class TeamManagerService {

  team: TeamType;

  constructor(private apollo: Apollo) { }

  setTeam(team: TeamType) {
    this.team = team;
  }

  getMembers() {
    this.apollo.watchQuery({
      query: getMembersQuery
    })
  }
}
