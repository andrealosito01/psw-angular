import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrizionistaComponent } from './nutrizionista.component';

describe('NutrizionistaComponent', () => {
  let component: NutrizionistaComponent;
  let fixture: ComponentFixture<NutrizionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutrizionistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutrizionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
