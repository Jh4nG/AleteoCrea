import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureVoicesComponent } from './future-voices.component';

describe('FutureVoicesComponent', () => {
  let component: FutureVoicesComponent;
  let fixture: ComponentFixture<FutureVoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureVoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureVoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
