import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/shared/types/user.type';
import { FriendsService } from '../../services/friends.service';

@Component({
  selector: 'app-invite-friends-page',
  templateUrl: './invite-friends-page.component.html',
  styleUrls: ['./invite-friends-page.component.scss']
})
export class InviteFriendsPageComponent implements OnInit {

  users: UserType[] = [];

  constructor(private friendsService: FriendsService) { }

  ngOnInit() {
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
