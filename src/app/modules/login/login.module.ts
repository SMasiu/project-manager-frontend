import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DeviderComponent } from 'src/app/shared/components/devider/devider.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInfoComponent } from 'src/app/shared/components/form-info/form-info.component';
import { GraphQLModule } from 'src/app/graphql.module';


@NgModule({
  declarations: [
    LoginPageComponent,
    LogoComponent,
    LoginFormComponent,
    DeviderComponent,
    RegisterPageComponent,
    RegisterFormComponent,
    FormInfoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule
  ],
  exports: [
    LoginPageComponent,
    RegisterPageComponent
  ]
})
export class LoginModule { }
