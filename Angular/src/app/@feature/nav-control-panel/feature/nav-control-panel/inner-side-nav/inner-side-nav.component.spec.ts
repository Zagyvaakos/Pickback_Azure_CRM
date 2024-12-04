import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerSideNavComponent } from './inner-side-nav.component';

describe('InnerSideNavComponent', () => {
  let component: InnerSideNavComponent;
  let fixture: ComponentFixture<InnerSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerSideNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
