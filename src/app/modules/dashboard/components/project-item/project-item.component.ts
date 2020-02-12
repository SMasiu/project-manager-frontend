import { Component, OnInit, Input } from '@angular/core';
import { ProjectType } from 'src/app/modules/projects/types/project.type';
import { Router } from '@angular/router';
import { UserType } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  
  openProjects: number = 0;
  closedProjects: number = 0;
  ownedProjects: number = 0;

  @Input() me: UserType;
  @Input() set projects(value) {
    this._projects = value;
    this.getProjectInfo();
  }
  
  get projects() {
    return this._projects;
  }

  private _projects: ProjectType[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getProjectInfo() {
    let cp = 0, op = 0, ow = 0;

    this.projects.forEach(p => {
      if(p.open) {
        op++;
      } else {
        cp++
      }
      if(p.owner_type === 'user' || (this.me && this.me.user_id === p.creator.user_id)) {
        ow++;
      }
    });

    this.closedProjects = cp;
    this.openProjects = op;
    this.ownedProjects = ow;
  }

  filterProjects() {
    if(this.projects.length) {
      let [project] = this.projects;
      return [{
        title: project.name,
        action: () => this.router.navigateByUrl(`/projects/project/${project.project_id}`)
      }];
    }
    return [];
  }

}
