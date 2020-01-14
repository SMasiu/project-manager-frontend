import { Component, OnInit, Input } from '@angular/core';
import NavbarItem from '../../classes/navbar-item';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit {

  @Input() items: NavbarItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
