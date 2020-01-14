import { Component, OnInit, Input } from '@angular/core';
import NavbarItem from '../../classes/navbar-item';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss']
})
export class AsideNavComponent implements OnInit {

  @Input() items: NavbarItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
