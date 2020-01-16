import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { MatIconModule } from '@angular/material';
import { ProfileImageComponent } from 'src/app/shared/components/profile-image/profile-image.component';

@NgModule({
  declarations: [
    LogoComponent,
    IconComponent,
    ProfileImageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    LogoComponent,
    IconComponent,
    ProfileImageComponent
  ]
})
export class SharedModule { }
