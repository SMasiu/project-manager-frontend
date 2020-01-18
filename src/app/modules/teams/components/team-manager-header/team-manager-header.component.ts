import { Component, OnInit, Input } from '@angular/core';
import { TeamType } from '../../types/team.type';

@Component({
  selector: 'app-team-manager-header',
  templateUrl: './team-manager-header.component.html',
  styleUrls: ['./team-manager-header.component.scss']
})
export class TeamManagerHeaderComponent implements OnInit {

  @Input() team: TeamType;

  constructor() { }

  ngOnInit() {
  }

}
