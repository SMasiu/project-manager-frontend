import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManagerHeaderComponent } from './team-manager-header.component';

describe('TeamManagerHeaderComponent', () => {
  let component: TeamManagerHeaderComponent;
  let fixture: ComponentFixture<TeamManagerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamManagerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamManagerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
