import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { MatIconModule } from '@angular/material';
import { ProfileImageComponent } from 'src/app/shared/components/profile-image/profile-image.component';
import { PagesSelectComponent } from 'src/app/shared/components/pages-select/pages-select.component';

@NgModule({
  declarations: [
    LogoComponent,
    IconComponent,
    ProfileImageComponent,
    PagesSelectComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    LogoComponent,
    IconComponent,
    ProfileImageComponent,
    PagesSelectComponent
  ]
})
export class SharedModule { }
