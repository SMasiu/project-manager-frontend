import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToTaskComponent } from './add-user-to-task.component';

describe('AddUserToTaskComponent', () => {
  let component: AddUserToTaskComponent;
  let fixture: ComponentFixture<AddUserToTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
