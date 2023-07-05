import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieCarrousselComponent } from './categorie-carroussel.component';

describe('CategorieCarrousselComponent', () => {
  let component: CategorieCarrousselComponent;
  let fixture: ComponentFixture<CategorieCarrousselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieCarrousselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieCarrousselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
