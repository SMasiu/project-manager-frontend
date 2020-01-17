import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamPageComponent } from './components/team-page/team-page.component';
import { SharedModule } from '../shared/shared.module';
import { TeamItemGridComponent } from './components/team-item-grid/team-item-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamItemInlineComponent } from './components/team-item-inline/team-item-inline.component';
import { CreateTeamPageComponent } from './components/create-team-page/create-team-page.component';
import { TeamPageWrapperComponent } from './components/team-page-wrapper/team-page-wrapper.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ManageTeamComponent } from './components/manage-team/manage-team.component';



@NgModule({
  declarations: [
    TeamPageComponent,
    TeamItemGridComponent,
    TeamItemInlineComponent,
    CreateTeamPageComponent,
    TeamPageWrapperComponent,
    ManageTeamComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    TeamPageComponent,
    CreateTeamPageComponent,
    TeamPageWrapperComponent
  ]
})
export class TeamsModule { }
