import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncContentComponent } from './async-content.component';

describe('AsyncContentComponent', () => {
  let component: AsyncContentComponent;
  let fixture: ComponentFixture<AsyncContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
