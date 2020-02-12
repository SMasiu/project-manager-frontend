import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFullItemComponent } from './task-full-item.component';

describe('TaskFullItemComponent', () => {
  let component: TaskFullItemComponent;
  let fixture: ComponentFixture<TaskFullItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFullItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFullItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
