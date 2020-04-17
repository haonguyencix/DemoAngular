import { TestBed, async, inject } from '@angular/core/testing';

import { CheckHomeGuard } from './check-home.guard';

describe('CheckHomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckHomeGuard]
    });
  });

  it('should ...', inject([CheckHomeGuard], (guard: CheckHomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
