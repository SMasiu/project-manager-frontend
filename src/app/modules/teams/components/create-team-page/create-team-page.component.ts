import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateTeamService } from '../../services/create-team.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team-page',
  templateUrl: './create-team-page.component.html',
  styleUrls: ['./create-team-page.component.scss']
})
export class CreateTeamPageComponent implements OnInit {

  form: FormGroup;

  constructor(private createTeamService: CreateTeamService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
    });
  }

  handleSubmit() {
    this.createTeamService.createTeam(this.form.value).pipe(take(1)).subscribe( team => {
      this.router.navigateByUrl(`/teams/manage/${team.team_id}`);
    });
  }

}
