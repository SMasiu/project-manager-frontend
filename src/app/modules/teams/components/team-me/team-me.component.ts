import { Component, OnInit, Input } from '@angular/core';
import { TeamMeType } from '../../types/team.type';

@Component({
  selector: 'app-team-me',
  templateUrl: './team-me.component.html',
  styleUrls: ['./team-me.component.scss']
})
export class TeamMeComponent implements OnInit {

  @Input() me: TeamMeType;

  constructor() { }

  ngOnInit() {
  }

}
