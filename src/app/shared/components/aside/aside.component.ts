import { Component, OnInit, Input } from '@angular/core';
import NavbarItem from '../../classes/navbar-item';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  @Input() items: NavbarItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
