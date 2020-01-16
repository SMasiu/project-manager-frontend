import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { TeamType } from '../../types/team.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  teams: TeamType[] = [];
  teamsSubsctiption: Subscription;

  constructor(private teamsService: TeamService) { }

  ngOnInit() {
    this.teamsService.downloadTeams();
    this.teams = this.teamsService.getTeams();
    this.teamsSubsctiption = this.teamsService.teamsChanges.subscribe( t => this.teams = t );
  }

}
