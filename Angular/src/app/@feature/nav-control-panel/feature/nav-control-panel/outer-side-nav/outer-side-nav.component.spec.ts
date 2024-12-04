import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterSideNavComponent } from './outer-side-nav.component';

describe('OuterSideNavComponent', () => {
  let component: OuterSideNavComponent;
  let fixture: ComponentFixture<OuterSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OuterSideNavComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OuterSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
