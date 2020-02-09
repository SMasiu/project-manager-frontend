import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/modules/teams/services/team.service';
import { TeamType } from 'src/app/modules/teams/types/team.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  teams: TeamType[];
  form: FormGroup;

  constructor(private teamService: TeamService, private projectsService: ProjectsService) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      description: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(500)]),
      team_id: new FormControl('-1')
    })

    this.teamService.teamsChanges.subscribe( t => this.teams = t );

    this.teams = this.teamService.getTeams();

    this.teamService.downloadTeams();
  }

  handleSubmit() {
    this.projectsService.createProject(this.form.value);
  }

}
