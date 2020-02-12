import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOwnerTypeComponent } from './change-owner-type.component';

describe('ChangeOwnerTypeComponent', () => {
  let component: ChangeOwnerTypeComponent;
  let fixture: ComponentFixture<ChangeOwnerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeOwnerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOwnerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
