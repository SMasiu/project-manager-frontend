import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() icon: string = 'people';
  @Input() emptyMessage: string = '';
  constructor() { }

  ngOnInit() {
  }

}
