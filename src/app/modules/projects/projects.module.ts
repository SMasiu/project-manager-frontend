import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { ProjectsWrapperPageComponent } from './components/projects-wrapper-page/projects-wrapper-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';


@NgModule({
  declarations: [
    ProjectsPageComponent,
    ProjectsWrapperPageComponent,
    ProjectItemComponent,
    ProjectPageComponent,
    TaskItemComponent,
    CreateProjectComponent,
    CreateColumnComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  entryComponents: [
    CreateColumnComponent,
    CreateTaskComponent
  ],
  exports: [
    ProjectsPageComponent,
    ProjectsWrapperPageComponent,
    ProjectPageComponent,
    CreateProjectComponent
  ]
})
export class ProjectsModule { }
