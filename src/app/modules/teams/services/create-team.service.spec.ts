import { TestBed } from '@angular/core/testing';

import { CreateTeamService } from './create-team.service';

describe('CreateTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateTeamService = TestBed.get(CreateTeamService);
    expect(service).toBeTruthy();
  });
});
