import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPageWrapperComponent } from './friends-page-wrapper.component';

describe('FriendsPageWrapperComponent', () => {
  let component: FriendsPageWrapperComponent;
  let fixture: ComponentFixture<FriendsPageWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsPageWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
