import { TestBed } from '@angular/core/testing';

import { UserordersService } from './userorders.service';

describe('UserordersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserordersService = TestBed.get(UserordersService);
    expect(service).toBeTruthy();
  });
});
