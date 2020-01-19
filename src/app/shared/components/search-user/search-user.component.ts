import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { take } from 'rxjs/operators';
import { UserType } from '../../types/user.type';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  @Output() change: EventEmitter<UserType[]> = new EventEmitter();

  users: UserType[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().pipe(take(1)).subscribe(
      users => this.serUsers(users)
    );
  }

  serUsers(users: UserType[]) {
    this.users = users;
    this.change.emit(users);
  }

}
