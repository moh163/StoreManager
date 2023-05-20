import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventairePageComponent } from './inventaire-page.component';

describe('InventairePageComponent', () => {
  let component: InventairePageComponent;
  let fixture: ComponentFixture<InventairePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventairePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventairePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
