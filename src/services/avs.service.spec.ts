import { TestBed } from '@angular/core/testing';

import { AvsService } from './avs.service';

describe('AvsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvsService = TestBed.get(AvsService);
    expect(service).toBeTruthy();
  });
});
