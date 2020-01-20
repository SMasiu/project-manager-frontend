import { TestBed } from '@angular/core/testing';

import { CacheQueriesService } from './cache-queries.service';

describe('CacheQueriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheQueriesService = TestBed.get(CacheQueriesService);
    expect(service).toBeTruthy();
  });
});
