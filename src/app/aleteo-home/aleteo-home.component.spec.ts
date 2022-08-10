import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AleteoHomeComponent } from './aleteo-home.component';

describe('AleteoHomeComponent', () => {
  let component: AleteoHomeComponent;
  let fixture: ComponentFixture<AleteoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AleteoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AleteoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
