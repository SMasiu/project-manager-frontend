import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserType } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-invite-member-page',
  templateUrl: './invite-member-page.component.html',
  styleUrls: ['./invite-member-page.component.scss']
})
export class InviteMemberPageComponent implements OnInit {

  team_id: string;
  users: UserType[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      this.team_id = params.get('id');
    });
  }

  setUsers(users: UserType[]) {
    this.users = users;
  }

}
