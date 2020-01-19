import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMemberPageComponent } from './invite-member-page.component';

describe('InviteMemberPageComponent', () => {
  let component: InviteMemberPageComponent;
  let fixture: ComponentFixture<InviteMemberPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteMemberPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteMemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
