import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMeComponent } from './team-me.component';

describe('TeamMeComponent', () => {
  let component: TeamMeComponent;
  let fixture: ComponentFixture<TeamMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
