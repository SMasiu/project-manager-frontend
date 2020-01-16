import { Component, OnInit, Input } from '@angular/core';
import { TeamType } from '../../types/team.type';

@Component({
  selector: 'app-team-item-grid',
  templateUrl: './team-item-grid.component.html',
  styleUrls: ['./team-item-grid.component.scss']
})
export class TeamItemGridComponent implements OnInit {

  @Input() team: TeamType;

  constructor() { }

  ngOnInit() {
  }

}
