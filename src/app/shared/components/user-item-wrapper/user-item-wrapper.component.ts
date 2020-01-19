import { Component, OnInit, Input } from '@angular/core';
import { UserType } from '../../types/user.type';

@Component({
  selector: 'app-user-item-wrapper',
  templateUrl: './user-item-wrapper.component.html',
  styleUrls: ['./user-item-wrapper.component.scss']
})
export class UserItemWrapperComponent implements OnInit {

  @Input() user: UserType;

  constructor() { }

  ngOnInit() {
  }

}
