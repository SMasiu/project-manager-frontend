import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { ProjectsWrapperPageComponent } from './components/projects-wrapper-page/projects-wrapper-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectsPageComponent,
    ProjectsWrapperPageComponent,
    ProjectItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProjectsPageComponent,
    ProjectsWrapperPageComponent
  ]
})
export class ProjectsModule { }
