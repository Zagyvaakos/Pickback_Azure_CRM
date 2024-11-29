import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavControlPanelComponent } from './nav-control-panel.component';

describe('NavControlPanelComponent', () => {
  let component: NavControlPanelComponent;
  let fixture: ComponentFixture<NavControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavControlPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
