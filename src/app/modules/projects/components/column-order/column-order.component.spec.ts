import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnOrderComponent } from './column-order.component';

describe('ColumnOrderComponent', () => {
  let component: ColumnOrderComponent;
  let fixture: ComponentFixture<ColumnOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
