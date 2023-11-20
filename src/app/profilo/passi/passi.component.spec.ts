import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiComponent } from './passi.component';

describe('PassiComponent', () => {
  let component: PassiComponent;
  let fixture: ComponentFixture<PassiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
