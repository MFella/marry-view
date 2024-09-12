import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarrySectionComponent } from './marry-section.component';

describe('MarrySectionComponent', () => {
  let component: MarrySectionComponent;
  let fixture: ComponentFixture<MarrySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarrySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarrySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
