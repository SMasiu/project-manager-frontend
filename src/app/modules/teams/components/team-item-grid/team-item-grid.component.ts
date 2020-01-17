import { Component, OnInit, Input } from '@angular/core';
import { TeamType } from '../../types/team.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-item-grid',
  templateUrl: './team-item-grid.component.html',
  styleUrls: ['./team-item-grid.component.scss']
})
export class TeamItemGridComponent implements OnInit {

  @Input() team: TeamType;
  
  constructor(private router: Router) { }

  manage() {
    this.router.navigateByUrl(`/teams/manage/${this.team.team_id}`);
  }

  ngOnInit() {
  }

}
