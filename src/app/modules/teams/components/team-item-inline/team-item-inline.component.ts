import { Component, OnInit, Input } from '@angular/core';
import { TeamType } from '../../types/team.type';

@Component({
  selector: 'app-team-item-inline',
  templateUrl: './team-item-inline.component.html',
  styleUrls: ['./team-item-inline.component.scss']
})
export class TeamItemInlineComponent implements OnInit {

  @Input() team: TeamType;

  constructor() { }

  ngOnInit() {
  }

}
