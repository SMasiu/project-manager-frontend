import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamPageComponent } from './components/team-page/team-page.component';
import { SharedModule } from '../shared/shared.module';
import { TeamItemGridComponent } from './components/team-item-grid/team-item-grid.component';



@NgModule({
  declarations: [
    TeamPageComponent,
    TeamItemGridComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TeamPageComponent
  ]
})
export class TeamsModule { }
