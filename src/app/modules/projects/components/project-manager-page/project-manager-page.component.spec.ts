import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerPageComponent } from './project-manager-page.component';

describe('ProjectManagerPageComponent', () => {
  let component: ProjectManagerPageComponent;
  let fixture: ComponentFixture<ProjectManagerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
