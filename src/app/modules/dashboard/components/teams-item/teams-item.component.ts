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
  @Input() teams: TeamType[] = [];

  form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('')
    });
  }

  filterItems() {
    let items = [];
    for(let i = 0; i < this.teams.length; i++) {
      if(i === 2) {
        break;
      }
      items.push({
        title: this.teams[i].name,
        action: () => {
          this.router.navigateByUrl(`/teams/manage/${this.teams[i].team_id}`);
        }
      });
    }
    return items;
  }

  handleSubmit() {
    this.router.navigateByUrl(`/teams?search=${this.form.value.search}`);
  }

}
