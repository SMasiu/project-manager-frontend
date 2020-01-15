import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-info-item',
  templateUrl: './account-info-item.component.html',
  styleUrls: ['./account-info-item.component.scss']
})
export class AccountInfoItemComponent implements OnInit {

  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() noBorder: boolean = false;
  @Input() badge: number = 0;

  constructor() { }

  ngOnInit() {
    this.badge = parseInt(<any>this.badge);
  }

  getBadgeClasses() {
    return `badge badge-${this.badge === 0 ? 'light' : 'danger'}`;
  }

  getBadge() {
    return this.badge > 99 ? 99 : this.badge;
  }

}
