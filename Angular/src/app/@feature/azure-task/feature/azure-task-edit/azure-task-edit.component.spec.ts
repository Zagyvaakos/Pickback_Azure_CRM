import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureTaskEditComponent } from './azure-task-edit.component';

describe('AzureTaskEditComponent', () => {
  let component: AzureTaskEditComponent;
  let fixture: ComponentFixture<AzureTaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AzureTaskEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzureTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
