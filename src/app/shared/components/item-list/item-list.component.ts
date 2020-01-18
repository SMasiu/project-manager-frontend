import { Component, OnInit, Input } from '@angular/core';

interface Item {
  header: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  
  @Input() vertical: boolean = false;
  @Input() items: Item[];

  constructor() { }

  ngOnInit() {
  }

}
