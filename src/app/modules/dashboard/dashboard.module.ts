import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { AccountItemComponent } from './components/account-item/account-item.component';
import { SharedModule } from '../shared/shared.module';
import { AccountInfoItemComponent } from '../../shared/components/account-info-item/account-info-item.component';
import { TeamsItemComponent } from './components/teams-item/teams-item.component';
import { ListComponent } from './components/list/list.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { FriendsItemComponent } from './components/friends-item/friends-item.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardItemComponent,
    AccountItemComponent,
    TeamsItemComponent,
    ListComponent,
    ProjectItemComponent,
    FriendsItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardModule { }
