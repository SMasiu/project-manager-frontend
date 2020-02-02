import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsWrapperPageComponent } from './projects-wrapper-page.component';

describe('ProjectsWrapperPageComponent', () => {
  let component: ProjectsWrapperPageComponent;
  let fixture: ComponentFixture<ProjectsWrapperPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsWrapperPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsWrapperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
