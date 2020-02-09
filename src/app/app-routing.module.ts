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
import { ChangePermissionPageComponent } from './modules/teams/components/change-permission-page/change-permission-page.component';
import { FriendsPageWrapperComponent } from './modules/friends/components/friends-page-wrapper/friends-page-wrapper.component';
import { FriendsPageComponent } from './modules/friends/components/friends-page/friends-page.component';
import { InviteFriendsPageComponent } from './modules/friends/components/invite-friends-page/invite-friends-page.component';
import { FriendsInvitationPageComponent } from './modules/friends/components/friends-invitation-page/friends-invitation-page.component';
import { ProjectsWrapperPageComponent } from './modules/projects/components/projects-wrapper-page/projects-wrapper-page.component';
import { ProjectsPageComponent } from './modules/projects/components/projects-page/projects-page.component';
import { ProjectPageComponent } from './modules/projects/components/project-page/project-page.component';
import { CreateProjectComponent } from './modules/projects/components/create-project/create-project.component';


const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'register', component: RegisterPageComponent },
	{ path: 'dashboard', component: DashboardPageComponent },
	{ path: 'teams', component: TeamPageWrapperComponent, children: [
		{ path: '', pathMatch: 'full', component: TeamPageComponent },
		{ path: 'create', component: CreateTeamPageComponent },
		{ path: 'invitations', component: TeamInvitationPageComponent },
		{ path: 'manage/:id', component: ManageTeamComponent },
		{ path: 'invite', component: InviteMemberPageComponent },
		{ path: 'danger-zone', component: DangerZonePageComponent },
		{ path: 'change-permission', component: ChangePermissionPageComponent },
	]},
	{ path: 'friends', component: FriendsPageWrapperComponent, children: [
		{ path: '', pathMatch: 'full', component: FriendsPageComponent },
		{ path: 'invite', component: InviteFriendsPageComponent },
		{ path: 'invitations', component: FriendsInvitationPageComponent }
	]},
	{ path: 'projects', component: ProjectsWrapperPageComponent, children: [
		{ path: '', pathMatch: 'full', component: ProjectsPageComponent },
		{ path: 'create', component: CreateProjectComponent },
		{ path: 'project/:id', component: ProjectPageComponent },
	]}, 
	{ path: 'about', component: AboutPageComponent },
	{ path: 'contact', component: ContactPageComponent },
	//errors!!!
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
