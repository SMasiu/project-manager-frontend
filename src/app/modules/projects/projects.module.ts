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


@NgModule({
  declarations: [
    ProjectsPageComponent,
    ProjectsWrapperPageComponent,
    ProjectItemComponent,
    ProjectPageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  exports: [
    ProjectsPageComponent,
    ProjectsWrapperPageComponent,
    ProjectPageComponent
  ]
})
export class ProjectsModule { }
