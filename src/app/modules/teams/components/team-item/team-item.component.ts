import { Component, OnInit, Input } from '@angular/core';
import { TeamType } from '../../types/team.type';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss']
})
export class TeamItemComponent implements OnInit {

  @Input() team: TeamType;
  @Input() noFooter: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
