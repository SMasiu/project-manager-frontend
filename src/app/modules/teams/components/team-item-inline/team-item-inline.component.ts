import { Component, OnInit, Input } from '@angular/core';
import { TeamType } from '../../types/team.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-item-inline',
  templateUrl: './team-item-inline.component.html',
  styleUrls: ['./team-item-inline.component.scss']
})
export class TeamItemInlineComponent implements OnInit {

  @Input() team: TeamType;
  
  constructor(private router: Router) { }

  manage() {
    this.router.navigateByUrl(`/teams/manage/${this.team.team_id}`);
  }

  ngOnInit() {
  }

}
