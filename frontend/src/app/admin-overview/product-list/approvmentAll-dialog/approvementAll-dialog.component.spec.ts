import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovmentAllDialogComponent } from './approvementAll-dialog.component';

describe('ApprovmentAllDialogComponent', () => {
  let component: ApprovmentAllDialogComponent;
  let fixture: ComponentFixture<ApprovmentAllDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovmentAllDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovmentAllDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
