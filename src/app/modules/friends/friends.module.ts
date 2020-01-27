import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsPageWrapperComponent } from './components/friends-page-wrapper/friends-page-wrapper.component';
import { FriendsPageComponent } from './components/friends-page/friends-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InviteFriendsPageComponent } from './components/invite-friends-page/invite-friends-page.component';
import { FriendsInvitationPageComponent } from './components/friends-invitation-page/friends-invitation-page.component';



@NgModule({
  declarations: [
    FriendsPageWrapperComponent,
    FriendsPageComponent,
    InviteFriendsPageComponent,
    FriendsInvitationPageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule
  ],
  exports: [
    FriendsPageWrapperComponent,
    FriendsPageComponent,
    InviteFriendsPageComponent,
    FriendsInvitationPageComponent
  ]
})
export class FriendsModule { }
