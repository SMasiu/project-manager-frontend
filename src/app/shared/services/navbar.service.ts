import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import NavbarItem from '../classes/navbar-item';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private pageItems: NavbarItem[] = [
    new NavbarItem(this.router, { value: 'Home', icon: 'home', top: 1, path: '/dashboard', displayIfLogged: 1 }),
    new NavbarItem(this.router, { value: 'Login', icon: 'key', top: 2, path: '/login', displayIfLogged: -1, extendedPath: ['/register'] }),
    new NavbarItem(this.router, { value: 'About', icon: 'book', top: 3, path: '/about', displayIfLogged: 0 }),
    new NavbarItem(this.router, { value: 'Contact', icon: 'envelope-closed', top: 4, path: '/contact', displayIfLogged: 0})
  ]

  valueChanges: Subject<NavbarItem[]> = new Subject();

  pageItemsToDisplay: NavbarItem[] = [];

  constructor(private router: Router, private userService: UserService) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe( (c:any) => this.onPathChanges(c.url));
  }

  onPathChanges(url) {
    this.pageItemsToDisplay = this.pageItems
    .filter( i => i.displayIfLogged === 0 || (this.userService.logged && i.displayIfLogged === 1) || (!this.userService.logged && i.displayIfLogged !== 1))
    .sort( (a, b) => a.top > b.top ? 1 : -1 );
    
    this.pageItemsToDisplay.forEach( p => p.isActive(url));
    this.valueChanges.next(this.pageItemsToDisplay);
  }

  navigate() {

  }

}
