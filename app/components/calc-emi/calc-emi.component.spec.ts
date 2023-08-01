import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcEmiComponent } from './calc-emi.component';

describe('CalcEmiComponent', () => {
  let component: CalcEmiComponent;
  let fixture: ComponentFixture<CalcEmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcEmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
