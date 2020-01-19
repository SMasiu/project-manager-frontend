import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemWrapperComponent } from './user-item-wrapper.component';

describe('UserItemWrapperComponent', () => {
  let component: UserItemWrapperComponent;
  let fixture: ComponentFixture<UserItemWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItemWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
