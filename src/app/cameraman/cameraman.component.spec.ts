import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameramanComponent } from './cameraman.component';

describe('CameramanComponent', () => {
  let component: CameramanComponent;
  let fixture: ComponentFixture<CameramanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameramanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameramanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
