import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTextComponent } from './confirm-text.component';

describe('ConfirmTextComponent', () => {
  let component: ConfirmTextComponent;
  let fixture: ComponentFixture<ConfirmTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
