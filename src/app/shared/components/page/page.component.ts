import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Subscription } from 'rxjs';
import NavbarItem from '../../classes/navbar-item';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  pageItems: NavbarItem[] = [];
  pageItemsSubscription: Subscription;
  
  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.pageItems = this.navbarService.pageItemsToDisplay;
    this.pageItemsSubscription = this.navbarService.valueChanges.subscribe( pages => this.pageItems = pages );
  }
 
  ngOnDestroy() {
    this.pageItemsSubscription.unsubscribe();
  }

}
