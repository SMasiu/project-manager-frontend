import { Component, OnInit, Input } from '@angular/core';
import { TeamType } from 'src/app/modules/teams/types/team.type';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-item',
  templateUrl: './teams-item.component.html',
  styleUrls: ['./teams-item.component.scss']
})
export class TeamsItemComponent implements OnInit {

  @Input() teamInvitations: TeamType[] = [];

  form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('')
    });
  }

  handleSubmit() {
    this.router.navigateByUrl(`/teams?search=${this.form.value.search}`);
  }

}
