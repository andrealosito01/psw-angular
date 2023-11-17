import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioViewerComponent } from './diario-viewer.component';

describe('DiarioViewerComponent', () => {
  let component: DiarioViewerComponent;
  let fixture: ComponentFixture<DiarioViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarioViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiarioViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
