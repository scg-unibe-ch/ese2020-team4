import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovmentDialogComponent } from './approvment-dialog.component';

describe('ApprovmentDialogComponent', () => {
  let component: ApprovmentDialogComponent;
  let fixture: ComponentFixture<ApprovmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
