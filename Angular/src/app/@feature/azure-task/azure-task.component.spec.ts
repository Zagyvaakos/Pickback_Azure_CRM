import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureTaskComponent } from './azure-task.component';

describe('AzureTaskComponent', () => {
  let component: AzureTaskComponent;
  let fixture: ComponentFixture<AzureTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AzureTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzureTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
