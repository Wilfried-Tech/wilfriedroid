import { TestBed } from '@angular/core/testing';

import { ScreenRotationService } from './screen-rotation.service';

describe('ScreenRotationService', () => {
  let service: ScreenRotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenRotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
