import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { ProjectType } from '../../types/project.type';
import { FormGroup, FormControl } from '@angular/forms';
import { TeamService } from 'src/app/modules/teams/services/team.service';
import { TeamType } from 'src/app/modules/teams/types/team.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-owner-type',
  templateUrl: './change-owner-type.component.html',
  styleUrls: ['./change-owner-type.component.scss']
})
export class ChangeOwnerTypeComponent implements OnInit {

  project: ProjectType;
  teams: TeamType[] = [];
  teamsSubscription: Subscription;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private teamService: TeamService) { }

  form: FormGroup;

  ngOnInit() {
    this.project = this.projectService.getProject();

    this.teamsSubscription = this.teamService.teamsChanges.subscribe( t => this.teams = t );
    this.teams = this.teamService.getTeams();
    this.teamService.downloadTeams();

    this.form = new FormGroup({
      owner_type: new FormControl('user'),
      team_id: new FormControl('-1')
    });
  }

  back() {
    this.router.navigateByUrl(`/projects/manage/${this.project.project_id}`);
  }

  ngOnDestroy() {
    this.teamsSubscription.unsubscribe();
  }

  onSubmit() {
    let { owner_type, team_id } = this.form.value;
    if(team_id === '-1') {
      team_id = null;
    }
    this.projectService.changeOwnerType(owner_type, team_id)
  }

}
