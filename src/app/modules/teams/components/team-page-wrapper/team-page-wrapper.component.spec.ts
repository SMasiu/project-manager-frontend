import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPageWrapperComponent } from './team-page-wrapper.component';

describe('TeamPageWrapperComponent', () => {
  let component: TeamPageWrapperComponent;
  let fixture: ComponentFixture<TeamPageWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPageWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
