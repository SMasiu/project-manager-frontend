import { Component, OnInit, Input } from '@angular/core';
import { AsideNavItemsType } from '../../types/aside-nav.type';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss']
})
export class AsideNavComponent implements OnInit {

  @Input() items: AsideNavItemsType[] = [];

  constructor() { }

  ngOnInit() {
  }

}
