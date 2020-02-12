import { Component, OnInit, Input } from '@angular/core';
import { ProjectType } from '../../types/project.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: ProjectType;

  more: boolean = false;
  moreBtnText: string = 'Read more...';

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  toogleMore() {
    this.more = !this.more;
    this.moreBtnText = this.more ? 'Back' : 'Read more...';
  }

  goToManage(project_id: string) {
    this.router.navigateByUrl(`/projects/manage/${project_id}`);
  }

  goToProject(project_id: string) {
    this.router.navigateByUrl(`/projects/project/${project_id}`);
  }

}
