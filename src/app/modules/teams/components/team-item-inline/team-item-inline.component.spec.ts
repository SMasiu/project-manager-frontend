import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamItemInlineComponent } from './team-item-inline.component';

describe('TeamItemInlineComponent', () => {
  let component: TeamItemInlineComponent;
  let fixture: ComponentFixture<TeamItemInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamItemInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamItemInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
