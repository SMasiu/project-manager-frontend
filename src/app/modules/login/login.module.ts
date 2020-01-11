import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DeviderComponent } from 'src/app/shared/components/devider/devider.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterFormComponent } from './components/register-form/register-form.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    LogoComponent,
    LoginFormComponent,
    DeviderComponent,
    RegisterPageComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    LoginPageComponent,
    RegisterPageComponent
  ]
})
export class LoginModule { }
