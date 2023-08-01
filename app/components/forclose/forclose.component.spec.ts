import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcloseComponent } from './forclose.component';

describe('ForcloseComponent', () => {
  let component: ForcloseComponent;
  let fixture: ComponentFixture<ForcloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
