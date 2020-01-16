import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pages-select',
  templateUrl: './pages-select.component.html',
  styleUrls: ['./pages-select.component.scss']
})
export class PagesSelectComponent implements OnInit {

  @Input() itemsOnPage: number = 0;
  @Input() set itemsCount(value: any) {
    this._itemsCount = parseInt(value);
    this.onInit();
  };

  get itemsCount() {
    return this._itemsCount;
  }

  _itemsCount: number = 0;
  pages: number;
  page: number = 1;
  @Output() change: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.itemsOnPage = parseInt(<any>this.itemsOnPage);
    this.onInit();
  }
  
  onInit() {
    this.pages = Math.ceil(this.itemsCount / this.itemsOnPage);
  }
  
  setPage(page) {
    this.page = page;
    this.change.emit(this.page);
  }

  next() {
    if(this.page < this.pages) {
      this.setPage(this.page + 1);
    }
  }

  previous() {
    if(this.page > 1) {
      this.setPage(this.page - 1);
    }
  }

  isSelected(p: number) {
    return p === this.page;
  }

  getIndex(pos: number) {
    if(this.pages - 2 > this.page) {
      return this.page + pos;
    } else if(this.pages > 2){
      return this.pages - [2, 1, 0][pos];
    } else {
      return [1, 2][pos];
    }
  }

}
