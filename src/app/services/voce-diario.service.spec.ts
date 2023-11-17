import { TestBed } from '@angular/core/testing';

import { VoceDiarioService } from './voce-diario.service';

describe('VoceDiarioService', () => {
  let service: VoceDiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoceDiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
