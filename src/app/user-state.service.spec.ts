import { TestBed, inject } from '@angular/core/testing';

import { UserStateService } from './user-state.service';

describe('UserStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStateService]
    });
  });

  it('should be created', inject([UserStateService], (service: UserStateService) => {
    expect(service).toBeTruthy();
  }));
});
