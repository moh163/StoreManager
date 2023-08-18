import { TestBed } from '@angular/core/testing';

import { HistoVenteService } from './histo-vente.service';

describe('HistoVenteService', () => {
  let service: HistoVenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoVenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
