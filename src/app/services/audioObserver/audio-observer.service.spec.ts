import { TestBed } from '@angular/core/testing';

import { AudioObserverService } from './audio-observer.service';

describe('AudioObserverService', () => {
  let service: AudioObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
