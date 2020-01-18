import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { MatIconModule } from '@angular/material';
import { ProfileImageComponent } from 'src/app/shared/components/profile-image/profile-image.component';
import { PagesSelectComponent } from 'src/app/shared/components/pages-select/pages-select.component';
import { FormInfoComponent } from 'src/app/shared/components/form-info/form-info.component';
import { ItemListComponent } from 'src/app/shared/components/item-list/item-list.component';
import { UserFullNamePipe } from 'src/app/shared/pipes/user-full-name.pipe';
import { CountItemComponent } from 'src/app/shared/components/count-item/count-item.component';
import { AccountInfoItemComponent } from 'src/app/shared/components/account-info-item/account-info-item.component';

@NgModule({
  declarations: [
    LogoComponent,
    IconComponent,
    ProfileImageComponent,
    PagesSelectComponent,
    FormInfoComponent,
    ItemListComponent,
    UserFullNamePipe,
    CountItemComponent,
    AccountInfoItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    LogoComponent,
    IconComponent,
    ProfileImageComponent,
    PagesSelectComponent,
    FormInfoComponent,
    ItemListComponent,
    UserFullNamePipe,
    CountItemComponent,
    AccountInfoItemComponent
  ]
})
export class SharedModule { }
