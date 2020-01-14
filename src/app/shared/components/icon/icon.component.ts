import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() icon: string = 'key';
  @ViewChild('wrapper', { static: true }) wrapper: { nativeElement: HTMLElement };

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.wrapper.nativeElement.innerHTML = `<span class="oi" data-glyph="${this.icon}" title="${this.icon}" aria-hidden="true"></span>`;
  }

}
