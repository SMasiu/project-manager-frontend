import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePermissionPageComponent } from './change-permission-page.component';

describe('ChangePermissionPageComponent', () => {
  let component: ChangePermissionPageComponent;
  let fixture: ComponentFixture<ChangePermissionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePermissionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePermissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
