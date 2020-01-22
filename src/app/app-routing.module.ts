import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './modules/login/components/login-page/login-page.component';
import { RegisterPageComponent } from './modules/login/components/register-page/register-page.component';
import { DashboardPageComponent } from './modules/dashboard/components/dashboard-page/dashboard-page.component';
import { AboutPageComponent } from './modules/about/components/about-page/about-page.component';
import { ContactPageComponent } from './modules/contact/components/contact-page/contact-page.component';
import { TeamPageComponent } from './modules/teams/components/team-page/team-page.component';
import { CreateTeamPageComponent } from './modules/teams/components/create-team-page/create-team-page.component';
import { TeamPageWrapperComponent } from './modules/teams/components/team-page-wrapper/team-page-wrapper.component';
import { ManageTeamComponent } from './modules/teams/components/manage-team/manage-team.component';
import { InviteMemberPageComponent } from './modules/teams/components/invite-member-page/invite-member-page.component';
import { DangerZonePageComponent } from './modules/teams/components/danger-zone-page/danger-zone-page.component';
import { TeamInvitationPageComponent } from './modules/teams/components/team-invitation-page/team-invitation-page.component';


const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'register', component: RegisterPageComponent },
	{ path: 'dashboard', component: DashboardPageComponent },
	{ path: 'about', component: AboutPageComponent },
	{ path: 'contact', component: ContactPageComponent },
	{ path: 'teams', component: TeamPageWrapperComponent, children: [
		{ path: '', pathMatch: 'full', component: TeamPageComponent },
		{ path: 'create', component: CreateTeamPageComponent },
		{ path: 'invitations', component: TeamInvitationPageComponent },
		{ path: 'manage/:id', component: ManageTeamComponent },
		{ path: 'invite/:id', component: InviteMemberPageComponent },
		{ path: 'danger-zone/:id', component: DangerZonePageComponent },
	]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
