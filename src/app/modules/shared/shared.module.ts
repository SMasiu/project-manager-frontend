import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';



@NgModule({
  declarations: [
    LogoComponent,
    IconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoComponent,
    IconComponent
  ]
})
export class SharedModule { }
