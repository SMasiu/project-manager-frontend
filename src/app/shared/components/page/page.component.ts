import { Component, OnInit } from '@angular/core';
import { AsideNavItemsType } from 'src/app/shared/types/aside-nav.type';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  pageItems: AsideNavItemsType[] = [
    { value: 'Login', action: () => console.log(1), active: true, icon: 'key' },
    { value: 'About', action: () => console.log(1), active: false, icon: 'book' },
    { value: 'Contact', action: () => console.log(1), active: false, icon: 'envelope-closed' },
  ]

  constructor() { }

  ngOnInit() {
  }
  
}
