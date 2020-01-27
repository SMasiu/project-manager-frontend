import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFriendsPageComponent } from './invite-friends-page.component';

describe('InviteFriendsPageComponent', () => {
  let component: InviteFriendsPageComponent;
  let fixture: ComponentFixture<InviteFriendsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteFriendsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteFriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
