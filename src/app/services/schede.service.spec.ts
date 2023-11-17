import { TestBed } from '@angular/core/testing';

import { SchedeService } from './schede.service';

describe('SchedeService', () => {
  let service: SchedeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
