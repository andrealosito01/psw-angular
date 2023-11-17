import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVoceComponent } from './new-voce.component';

describe('NewVoceComponent', () => {
  let component: NewVoceComponent;
  let fixture: ComponentFixture<NewVoceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVoceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVoceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
