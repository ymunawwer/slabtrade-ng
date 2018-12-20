import { TestBed, async, inject } from '@angular/core/testing';

import { IsSupplierGuard } from './is-supplier.guard';

describe('IsSupplierGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSupplierGuard]
    });
  });

  it('should ...', inject([IsSupplierGuard], (guard: IsSupplierGuard) => {
    expect(guard).toBeTruthy();
  }));
});
