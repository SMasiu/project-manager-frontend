import { Component, OnInit, Input } from '@angular/core';
import NavbarItem from '../../classes/navbar-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  @Input() items: NavbarItem[] = [];

  helpItems: NavbarItem[] = [
    new NavbarItem(this.router, { value: 'Help', icon: 'help', top: 1, displayIfLogged: 0, path: '/help' })
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
