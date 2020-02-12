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
import { MatIconModule } from '@angular/material';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserToTaskComponent } from './components/add-user-to-task/add-user-to-task.component';
import { TaskFullItemComponent } from './components/task-full-item/task-full-item.component';
import { ColumnOrderComponent } from './components/column-order/column-order.component';
import { ProjectManagerPageComponent } from './components/project-manager-page/project-manager-page.component';
import { ChangeOwnerTypeComponent } from './components/change-owner-type/change-owner-type.component';


@NgModule({
  declarations: [
    ProjectsPageComponent,
    ProjectsWrapperPageComponent,
    ProjectItemComponent,
    ProjectPageComponent,
    TaskItemComponent,
    CreateProjectComponent,
    CreateColumnComponent,
    CreateTaskComponent,
    AddUserToTaskComponent,
    TaskFullItemComponent,
    ColumnOrderComponent,
    ProjectManagerPageComponent,
    ChangeOwnerTypeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatIconModule,
    NgbModule,
    NgbDropdownModule,
  ],
  entryComponents: [
    CreateColumnComponent,
    CreateTaskComponent,
    AddUserToTaskComponent,
    TaskFullItemComponent,
    ColumnOrderComponent
  ],
  exports: [
    ProjectsPageComponent,
    ProjectsWrapperPageComponent,
    ProjectPageComponent,
    CreateProjectComponent,
    ProjectPageComponent,
    ChangeOwnerTypeComponent
  ]
})
export class ProjectsModule { }
