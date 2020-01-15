import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    LogoComponent,
    IconComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    LogoComponent,
    IconComponent
  ]
})
export class SharedModule { }
