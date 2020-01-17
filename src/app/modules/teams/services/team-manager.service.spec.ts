import { TestBed } from '@angular/core/testing';

import { TeamManagerService } from './team-manager.service';

describe('TeamManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamManagerService = TestBed.get(TeamManagerService);
    expect(service).toBeTruthy();
  });
});
