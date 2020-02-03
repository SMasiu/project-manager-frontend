import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ProjectService } from '../../services/project.service';
import { FullProjectType, ColumnType, TaskType } from '../../types/project.type';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  project: FullProjectType;
  projectSubscription: Subscription;

  loading: boolean = true;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      
      const project_id = params.get('id');

      this.projectSubscription = this.projectService.projectChanges.subscribe( p => {
        this.project = p;
        this.loading = false;
      });
      
      this.projectService.downloadProject(project_id);
      
      this.project = this.projectService.getProject();
      if(this.project) {
        this.loading = false;
      }
    });
  }

  getWidth() {
    return (this.project.columns.length + 1) * (300 + 40) + 40;
  }

  dropTask(event: CdkDragDrop<TaskType[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }
}
