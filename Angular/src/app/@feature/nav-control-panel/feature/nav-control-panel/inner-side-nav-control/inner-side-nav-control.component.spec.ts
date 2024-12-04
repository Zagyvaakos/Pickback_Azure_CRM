import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerSideNavControlComponent } from './inner-side-nav-control.component';

describe('InnerSideNavControlComponent', () => {
  let component: InnerSideNavControlComponent;
  let fixture: ComponentFixture<InnerSideNavControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerSideNavControlComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InnerSideNavControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
