import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-count-item',
  templateUrl: './count-item.component.html',
  styleUrls: ['./count-item.component.scss']
})
export class CountItemComponent implements OnInit {

  @Input() count: number = 0;
  @Input() title1: string = '';
  @Input() title2: string = '';

  constructor() { }

  ngOnInit() {
  }

}
