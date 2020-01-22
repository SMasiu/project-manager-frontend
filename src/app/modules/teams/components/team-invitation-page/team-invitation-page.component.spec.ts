import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInvitationPageComponent } from './team-invitation-page.component';

describe('TeamInvitationPageComponent', () => {
  let component: TeamInvitationPageComponent;
  let fixture: ComponentFixture<TeamInvitationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamInvitationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInvitationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
