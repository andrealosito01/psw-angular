import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisureComponent } from './misure.component';

describe('MisureComponent', () => {
  let component: MisureComponent;
  let fixture: ComponentFixture<MisureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
