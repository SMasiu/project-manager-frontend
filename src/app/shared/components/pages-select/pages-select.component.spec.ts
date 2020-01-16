import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesSelectComponent } from './pages-select.component';

describe('PagesSelectComponent', () => {
  let component: PagesSelectComponent;
  let fixture: ComponentFixture<PagesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
