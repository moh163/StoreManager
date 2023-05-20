import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoVentePageComponent } from './histo-vente-page.component';

describe('HistoVentePageComponent', () => {
  let component: HistoVentePageComponent;
  let fixture: ComponentFixture<HistoVentePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoVentePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoVentePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
