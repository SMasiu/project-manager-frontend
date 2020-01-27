import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsInvitationPageComponent } from './friends-invitation-page.component';

describe('FriendsInvitationPageComponent', () => {
  let component: FriendsInvitationPageComponent;
  let fixture: ComponentFixture<FriendsInvitationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsInvitationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsInvitationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
