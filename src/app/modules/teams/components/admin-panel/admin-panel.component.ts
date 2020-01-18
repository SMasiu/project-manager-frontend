import { Component, OnInit, Input } from '@angular/core';
import { TeamMeType } from '../../types/team.type';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  @Input() me: TeamMeType;

  constructor() { }

  ngOnInit() {
  }

}
