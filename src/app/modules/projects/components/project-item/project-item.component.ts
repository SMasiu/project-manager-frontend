import { Component, OnInit, Input } from '@angular/core';
import { ProjectType } from '../../types/project.type';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: ProjectType;

  more: boolean = false;
  moreBtnText: string = 'Read more...'

  constructor() { }

  ngOnInit() {
  }
  
  toogleMore() {
    this.more = !this.more;
    this.moreBtnText = this.more ? 'Back' : 'Read more...';
  }

}
