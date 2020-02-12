import { TestBed } from '@angular/core/testing';

import { GetCityService } from './get-city.service';

describe('GetCityService', () => {
  let service: GetCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
