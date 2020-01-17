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
    new NavbarItem(this.router, { value: 'Dashboard', icon: 'home', top: 1, path: '/dashboard', displayIfLogged: 1 }),
    new NavbarItem(this.router, { value: 'Login', icon: 'vpn_key', top: 2, path: '/login', displayIfLogged: -1, extendedPath: ['/register'] }),
    new NavbarItem(this.router, { value: 'About', icon: 'book', top: 4, path: '/about', displayIfLogged: 0 }),
    new NavbarItem(this.router, { value: 'Contact', icon: 'mail', top: 5, path: '/contact', displayIfLogged: 0}),
    new NavbarItem(this.router, { value: 'Teams', icon: 'people', top: 3, path: '/teams', displayIfLogged: 1, extendedPath: ['/teams/*'] })
  ]

  valueChanges: Subject<NavbarItem[]> = new Subject();

  pageItemsToDisplay: NavbarItem[] = [];
  lastUrl: string = '';

  constructor(private router: Router, private userService: UserService) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe( (c:any) => this.onPathChanges(c.url));

    this.userService.loggedChanges.subscribe( () => this.onPathChanges(this.lastUrl) );
  }

  onPathChanges(url) {
    this.lastUrl = url;
    this.pageItemsToDisplay = this.pageItems
    .filter( i => i.displayIfLogged === 0 || (this.userService.logged && i.displayIfLogged === 1) || (!this.userService.logged && i.displayIfLogged !== 1))
    .sort( (a, b) => a.top > b.top ? 1 : -1 );
    
    this.pageItemsToDisplay.forEach( p => p.isActive(url));
    this.valueChanges.next(this.pageItemsToDisplay);
  }

  navigate() {

  }

}
