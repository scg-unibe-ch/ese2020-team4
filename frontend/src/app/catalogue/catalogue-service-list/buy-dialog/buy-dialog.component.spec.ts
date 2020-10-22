import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyServiceComponent } from './buy-dialog.component';

describe('BuyServiceComponent', () => {
  let component: BuyServiceComponent;
  let fixture: ComponentFixture<BuyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyServiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
