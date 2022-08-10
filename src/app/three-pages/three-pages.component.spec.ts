import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreePagesComponent } from './three-pages.component';

describe('ThreePagesComponent', () => {
  let component: ThreePagesComponent;
  let fixture: ComponentFixture<ThreePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreePagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
