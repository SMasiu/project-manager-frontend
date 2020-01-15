import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { MeType } from 'src/app/shared/types/user.type';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

  user: MeType;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.userService.userChanges.subscribe( user => this.user = user );
  }

}
