import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalContentsComponent } from './additional-contents.component';

describe('AdditionalContentsComponent', () => {
  let component: AdditionalContentsComponent;
  let fixture: ComponentFixture<AdditionalContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalContentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
