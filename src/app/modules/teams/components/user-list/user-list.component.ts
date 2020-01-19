import { Component, OnInit, Input } from '@angular/core';
import { MemberType } from '../../types/member.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() members: MemberType[];
  @Input() permission: number = 0;
  @Input() meId: string = '';

  constructor() { }

  ngOnInit() {
  }

}
