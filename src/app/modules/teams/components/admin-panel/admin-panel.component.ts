import { Component, OnInit, Input } from '@angular/core';
import { TeamMeType, TeamType } from '../../types/team.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  @Input() me: TeamMeType;
  @Input() team: TeamType;

  constructor(private router: Router) { }
  
  ngOnInit() {
  }

  inviteMember() {
    this.router.navigateByUrl(`/teams/invite/${this.team.team_id}`);
  }

}
