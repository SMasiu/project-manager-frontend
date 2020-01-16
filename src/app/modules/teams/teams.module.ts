import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamPageComponent } from './components/team-page/team-page.component';
import { SharedModule } from '../shared/shared.module';
import { TeamItemGridComponent } from './components/team-item-grid/team-item-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TeamPageComponent,
    TeamItemGridComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TeamPageComponent
  ]
})
export class TeamsModule { }
