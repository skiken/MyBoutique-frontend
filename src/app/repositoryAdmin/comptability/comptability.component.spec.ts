import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptabilityComponent } from './comptability.component';

describe('ComptabilityComponent', () => {
  let component: ComptabilityComponent;
  let fixture: ComponentFixture<ComptabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
