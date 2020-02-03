import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-async-content',
  templateUrl: './async-content.component.html',
  styleUrls: ['./async-content.component.scss']
})
export class AsyncContentComponent implements OnInit {

  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
