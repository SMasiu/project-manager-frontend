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
import { TeamManagerHeaderComponent } from './components/team-manager-header/team-manager-header.component';
import { TeamItemComponent } from './components/team-item/team-item.component';
import { TeamMeComponent } from './components/team-me/team-me.component';
import { PermissionPipe } from './pipes/permission.pipe';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import {NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InviteMemberPageComponent } from './components/invite-member-page/invite-member-page.component'; 
import { DangerZonePageComponent } from './components/danger-zone-page/danger-zone-page.component';

@NgModule({
  declarations: [
    TeamPageComponent,
    TeamItemGridComponent,
    TeamItemInlineComponent,
    CreateTeamPageComponent,
    TeamPageWrapperComponent,
    ManageTeamComponent,
    TeamManagerHeaderComponent,
    TeamItemComponent,
    TeamMeComponent,
    PermissionPipe,
    AdminPanelComponent,
    UserListComponent,
    ProjectListComponent,
    InviteMemberPageComponent,
    DangerZonePageComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
  ],
  exports: [
    TeamPageComponent,
    CreateTeamPageComponent,
    TeamPageWrapperComponent,
    ManageTeamComponent,
    InviteMemberPageComponent,
    DangerZonePageComponent
  ]
})
export class TeamsModule { }
