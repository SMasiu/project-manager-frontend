import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PageComponent } from './shared/components/page/page.component';
import { AsideComponent } from './shared/components/aside/aside.component';
import { IconComponent } from './shared/components/icon/icon.component';
import { AboutModule } from './modules/about/about.module';
import { ContactModule } from './modules/contact/contact.module';
import { SharedModule } from './modules/shared/shared.module';
import { AsideMenuComponent } from './shared/components/aside-menu/aside-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    AsideComponent,
    IconComponent,
    AsideMenuComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    GraphQLModule,
    HttpClientModule,
    DashboardModule,
    AboutModule,
    ContactModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
