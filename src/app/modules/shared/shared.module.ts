import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { MatIconModule, MatDialogModule } from '@angular/material';
import { ProfileImageComponent } from 'src/app/shared/components/profile-image/profile-image.component';
import { PagesSelectComponent } from 'src/app/shared/components/pages-select/pages-select.component';
import { FormInfoComponent } from 'src/app/shared/components/form-info/form-info.component';
import { ItemListComponent } from 'src/app/shared/components/item-list/item-list.component';
import { UserFullNamePipe } from 'src/app/shared/pipes/user-full-name.pipe';
import { CountItemComponent } from 'src/app/shared/components/count-item/count-item.component';
import { AccountInfoItemComponent } from 'src/app/shared/components/account-info-item/account-info-item.component';
import { UserItemWrapperComponent } from 'src/app/shared/components/user-item-wrapper/user-item-wrapper.component';
import { SearchUserComponent } from 'src/app/shared/components/search-user/search-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { ConfirmTextComponent } from 'src/app/shared/components/confirm-text/confirm-text.component';
import { AsyncContentComponent } from 'src/app/shared/components/async-content/async-content.component';
import { BoolPipe } from 'src/app/shared/pipes/bool.pipe';
import { AddButtonComponent } from 'src/app/shared/components/add-button/add-button.component';

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
    AccountInfoItemComponent,
    UserItemWrapperComponent,
    SearchUserComponent,
    ConfirmComponent,
    ConfirmTextComponent,
    AsyncContentComponent,
    BoolPipe,
    AddButtonComponent
  ],
  entryComponents: [
    ConfirmComponent,
    ConfirmTextComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
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
    AccountInfoItemComponent,
    UserItemWrapperComponent,
    SearchUserComponent,
    AsyncContentComponent,
    BoolPipe,
    AddButtonComponent
  ]
})
export class SharedModule { }
