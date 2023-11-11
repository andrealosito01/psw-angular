import { TestBed } from '@angular/core/testing';

import { PassiService } from './passi.service';

describe('PassiService', () => {
  let service: PassiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
