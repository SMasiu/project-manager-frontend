import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { TeamManagerService } from 'src/app/modules/teams/services/team-manager.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ProjectType } from '../../types/project.type';
import { MemberType } from 'src/app/modules/teams/types/member.type';

@Component({
  selector: 'app-project-manager-page',
  templateUrl: './project-manager-page.component.html',
  styleUrls: ['./project-manager-page.component.scss']
})
export class ProjectManagerPageComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private teamManagerService: TeamManagerService
  ) { }

  projectSubscription: Subscription;
  project: ProjectType;
  loading: boolean = true;
  teamMembers: MemberType[] = [];

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      
      const project_id = params.get('id');

      this.projectSubscription = this.projectService.projectChanges.subscribe( p => {
        this.project = p;
        this.loading = false;
        this.afterProjectGet();
      });
      
      this.projectService.downloadProject(project_id);
      
      this.project = this.projectService.getProject();
      if(this.project) {
        this.loading = false;
        this.afterProjectGet();
      }

    });
  }

  afterProjectGet() {
    if(this.project.team && !this.teamMembers.length) {
      this.teamManagerService.membersChanges.subscribe( m => this.teamMembers = m );

      this.teamManagerService.setTeam(this.project.team);
      this.teamManagerService.getMembers();

      this.teamMembers = [...this.teamManagerService.members];
    }
  }

}
