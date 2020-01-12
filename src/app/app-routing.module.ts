import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './modules/login/components/login-page/login-page.component';
import { RegisterPageComponent } from './modules/login/components/register-page/register-page.component';
import { DashboardPageComponent } from './modules/dashboard/components/dashboard-page/dashboard-page.component';


const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'register', component: RegisterPageComponent },
	{ path: 'dashboard', component: DashboardPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
