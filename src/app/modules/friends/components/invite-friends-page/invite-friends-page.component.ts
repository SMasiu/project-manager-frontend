import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/shared/types/user.type';
import { FriendsService } from '../../services/friends.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-invite-friends-page',
  templateUrl: './invite-friends-page.component.html',
  styleUrls: ['./invite-friends-page.component.scss']
})
export class InviteFriendsPageComponent implements OnInit {

  users: UserType[] = [];
  search: string = '';

  constructor(private friendsService: FriendsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap
      .pipe(take(1))
      .subscribe( query => {
        this.search = query.get('search');
      });
  }

  isAlredyInvited(user_id) {
    return this.friendsService.alredyInvitedFriends.findIndex( a => a === user_id ) === -1;
  }

  handleUsersChanges(users: UserType[]) {
    this.users = users;
  }

  inviteFriend(id: string) {
    this.friendsService.inviteFriend(id);
  }

  cancelInvitation(user_id: string) {
    this.friendsService.cancelInvitation(user_id);
  }

}
