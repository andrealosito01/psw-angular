import { TestBed } from '@angular/core/testing';

import { MisuraService } from './misura.service';

describe('MisuraService', () => {
  let service: MisuraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisuraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
