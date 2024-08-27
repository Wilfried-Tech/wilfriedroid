import { TestBed } from '@angular/core/testing';

import { PowerManagerService } from './power-manager.service';

describe('PowerManagerService', () => {
  let service: PowerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
