import { TestBed, inject } from '@angular/core/testing';

import { ConfesionService } from './confesion.service';

describe('ConfesionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfesionService]
    });
  });

  it('should be created', inject([ConfesionService], (service: ConfesionService) => {
    expect(service).toBeTruthy();
  }));
});
