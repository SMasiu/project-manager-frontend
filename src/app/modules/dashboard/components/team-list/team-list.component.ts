import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  @Input() teams: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
