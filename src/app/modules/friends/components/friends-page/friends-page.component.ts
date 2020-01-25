import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/shared/types/user.type';
import Paging from 'src/app/shared/classes/paging';
import { Subscription } from 'rxjs';
import { FriendsService } from '../../services/friends.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {

  friends: UserType[] = [];
  filtredFriends: UserType[] = [];
  pagedFriends: UserType[] = [];

  paging: Paging;
  pagingSubscription: Subscription;

  friendsSubscription: Subscription;

  form: FormGroup;
  searchSubscription: Subscription;

  constructor(private friendsService: FriendsService) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      search: new FormControl('')
    });
    
    this.paging = new Paging({
      filterCondition: (d, v) => !v ? true : `${d.name} ${d.surname} ${d.nick}`.search(v) !== -1,
      sortCondition: (x, y) => 0,
      itemsOnPage: 2
    });
    
    this.friendsSubscription = this.friendsService.friendsChanges.subscribe( friends => {
      this.friends = friends;
      this.paging.setData(this.friends);
    });
    
    this.pagingSubscription = this.paging.valueChanges.subscribe( data => {
      this.filtredFriends = data.filtredData;
      this.pagedFriends = data.pageData;
    });
    
    this.searchSubscription = this.form.controls.search.valueChanges.subscribe( v => this.paging.filter(v));
    
    this.friends = this.friendsService.getFriends();
    this.paging.setData(this.friends);

    this.friendsService.downloadFriends();

  }

  handlePageChanges(page: number) {
    this.paging.setPage(page);
  }

  ngOnDestroy() {
    this.pagingSubscription.unsubscribe();
    this.friendsSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

}
