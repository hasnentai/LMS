import { TestBed, inject } from '@angular/core/testing';

import { ServerserviceService } from './serverservice.service';

describe('ServerserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerserviceService]
    });
  });

  it('should be created', inject([ServerserviceService], (service: ServerserviceService) => {
    expect(service).toBeTruthy();
  }));
});
