import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './components/contact-page/contact-page.component';



@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ContactPageComponent
  ]
})
export class ContactModule { }
