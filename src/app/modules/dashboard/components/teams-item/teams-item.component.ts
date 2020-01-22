import { Component, OnInit, Input } from '@angular/core';
import { TeamType } from 'src/app/modules/teams/types/team.type';

@Component({
  selector: 'app-teams-item',
  templateUrl: './teams-item.component.html',
  styleUrls: ['./teams-item.component.scss']
})
export class TeamsItemComponent implements OnInit {

  @Input() teamInvitations: TeamType[] = [];

  constructor() { }

  ngOnInit() {
  }

}
