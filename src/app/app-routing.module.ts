import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './modules/login/components/login-page/login-page.component';
import { RegisterPageComponent } from './modules/login/components/register-page/register-page.component';
import { DashboardPageComponent } from './modules/dashboard/components/dashboard-page/dashboard-page.component';
import { AboutPageComponent } from './modules/about/components/about-page/about-page.component';
import { ContactPageComponent } from './modules/contact/components/contact-page/contact-page.component';
import { TeamPageComponent } from './modules/teams/components/team-page/team-page.component';


const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'register', component: RegisterPageComponent },
	{ path: 'dashboard', component: DashboardPageComponent },
	{ path: 'about', component: AboutPageComponent },
	{ path: 'contact', component: ContactPageComponent },
	{ path: 'teams', component: TeamPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
