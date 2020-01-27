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

  handleUsersChanges(users: UserType[]) {
    this.users = users;
  }

  inviteFriend(id: string) {
    this.friendsService.inviteFriend(id);
  }

}
