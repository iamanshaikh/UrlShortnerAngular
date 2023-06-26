import { TestBed } from '@angular/core/testing';

import { UrlshortUrlService } from './urlshort-url.service';

describe('UrlshortUrlService', () => {
  let service: UrlshortUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlshortUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
