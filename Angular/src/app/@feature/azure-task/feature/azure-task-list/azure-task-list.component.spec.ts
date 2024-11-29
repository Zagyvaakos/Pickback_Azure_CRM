import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureTaskListComponent } from './azure-task-list.component';

describe('AzureTaskListComponent', () => {
  let component: AzureTaskListComponent;
  let fixture: ComponentFixture<AzureTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AzureTaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzureTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
