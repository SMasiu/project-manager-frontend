import { Component, OnInit, Input } from '@angular/core';
import { UserType } from 'src/app/shared/types/user.type';
import { FriendsService } from 'src/app/modules/friends/services/friends.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.scss']
})
export class FriendsItemComponent implements OnInit {

  @Input() friendInvitations: UserType[] = [];

  form: FormGroup;

  friendsCount: number = 0;
  friendsSubscription: Subscription;

  constructor(private friendsService: FriendsService, private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      search: new FormControl('')
    });

    this.friendsCount = this.friendsService.friends.length;
    this.friendsSubscription = this.friendsService.friendsChanges.subscribe( f => this.friendsCount = f.friends.length );
    this.friendsService.downloadFriends();
  }

  ngOnDestroy() {
    this.friendsSubscription.unsubscribe();
  }

  onSubmit() {
    this.router.navigateByUrl(`/friends/invite?search=${this.form.value.search}`);
  }

}
