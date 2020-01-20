import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { take, debounceTime } from 'rxjs/operators';
import { UserType } from '../../types/user.type';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  @Output() change: EventEmitter<UserType[]> = new EventEmitter();

  users: UserType[];
  count: number = 0;

  offset: number = 0;
  fullname: string = '';
  limit: number = 3;

  form: FormGroup;
  fullnameSubscription: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.form = new FormGroup({
      fullname: new FormControl('')
    });

    this.fullnameSubscription = this.form.controls.fullname.valueChanges.pipe(
      debounceTime(500)
    ).subscribe( fullname => {
      this.fullname = fullname;
      this.getAndSave();
    });

    this.getAndSave();
  }

  setUsers(users: UserType[]) {
    this.users = users;
    this.change.emit(users);
  }

  getAndSave() {
    const { offset, fullname, limit } = this;
    this.usersService.getUsers({limit, offset, fullname}).pipe(take(1)).subscribe(
      ({users, count}) => {
        this.count = count;
        this.setUsers(users);
      }
    );
  }

  handlePageChange(page: number) {
    this.offset = page * this.limit - this.limit;
    this.getAndSave();
  }

  ngOnDestroy() {
    this.fullnameSubscription.unsubscribe();
  }

}
