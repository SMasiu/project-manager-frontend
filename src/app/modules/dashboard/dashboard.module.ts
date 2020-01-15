import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { AccountItemComponent } from './components/account-item/account-item.component';
import { SharedModule } from '../shared/shared.module';
import { AccountInfoItemComponent } from './components/account-info-item/account-info-item.component';



@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardItemComponent,
    AccountItemComponent,
    AccountInfoItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardModule { }
