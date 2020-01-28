import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/shared/types/user.type';
import Paging from 'src/app/shared/classes/paging';
import { Subscription } from 'rxjs';
import { FriendsService } from '../../services/friends.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { mapUserToFriends } from '../../functions/map-user-to-friend';
import { FriendType } from '../../types/friend.type';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {

  friends: FriendType[] = [];
  filtredFriends: FriendType[] = [];
  pagedFriends: FriendType[] = [];

  invitedFriends: FriendType[] = [];

  paging: Paging;
  pagingSubscription: Subscription;

  friendsSubscription: Subscription;
  
  form: FormGroup;
  searchSubscription: Subscription;

  friendsInvitationCount: number = 0;
  notificationSubscription: Subscription;

  constructor(
    private friendsService: FriendsService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      search: new FormControl('')
    });
    
    this.paging = new Paging({
      filterCondition: (d, v) => !v ? true : `${d.name} ${d.surname} ${d.nick}`.search(v) !== -1,
      sortCondition: (x, y) => 0,
      itemsOnPage: 2
    });
    
    this.friendsSubscription = this.friendsService.friendsChanges.subscribe( friendsAll => {
      this.friends = mapUserToFriends(friendsAll.friends, true);
      this.invitedFriends = mapUserToFriends(friendsAll.invited, false);
      this.paging.setData([...this.friends,...this.invitedFriends]);
    });

    this.pagingSubscription = this.paging.valueChanges.subscribe( data => {
      this.filtredFriends = data.filtredData;
      this.pagedFriends = data.pageData;
    });
    
    this.searchSubscription = this.form.controls.search.valueChanges.subscribe( v => this.paging.filter(v));
    
    this.friends = mapUserToFriends(this.friendsService.getFriends(), true);
    this.invitedFriends = mapUserToFriends(this.friendsService.getInvitedFriends(), false);
    this.paging.setData([...this.friends, ...this.invitedFriends]);

    this.friendsService.downloadFriends();

    this.friendsInvitationCount = this.notificationService.getNotifications().friendInvitations.length;
    this.notificationSubscription = this.notificationService.notificationsChanges.subscribe( n => this.friendsInvitationCount = n.friendInvitations.length );

  }

  handlePageChanges(page: number) {
    this.paging.setPage(page);
  }

  openRemoveFriendDialog(user: UserType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: 'auto',
      data: {
        text: `
          <p>Are you sure to remove: <p>
          <p><strong>${user.name} ${user.surname}</strong>?</p>
        `,
        successBtnText: 'Remove'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.friendsService.removeFriend(user.user_id);
      }
    });
  }

  cancelInvitation(user_id: string) {
    this.friendsService.cancelInvitation(user_id);
  }

  ngOnDestroy() {
    this.pagingSubscription.unsubscribe();
    this.friendsSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.notificationSubscription.unsubscribe();
  }
  
}
