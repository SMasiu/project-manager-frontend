import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamItemGridComponent } from './team-item-grid.component';

describe('TeamItemGridComponent', () => {
  let component: TeamItemGridComponent;
  let fixture: ComponentFixture<TeamItemGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamItemGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamItemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
