import { TestBed } from '@angular/core/testing';

import { PermissionStatisticsGuard } from './permission-statistics.guard';

describe('PermissionStatisticsGuard', () => {
  let guard: PermissionStatisticsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermissionStatisticsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
