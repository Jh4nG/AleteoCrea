import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproductorComponentComponent } from './reproductor-component.component';

describe('ReproductorComponentComponent', () => {
  let component: ReproductorComponentComponent;
  let fixture: ComponentFixture<ReproductorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReproductorComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReproductorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
