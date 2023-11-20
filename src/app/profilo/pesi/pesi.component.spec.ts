import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesiComponent } from './pesi.component';

describe('PesiComponent', () => {
  let component: PesiComponent;
  let fixture: ComponentFixture<PesiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
