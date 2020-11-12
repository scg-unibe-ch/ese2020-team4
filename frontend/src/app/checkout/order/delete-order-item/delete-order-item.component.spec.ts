import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrderItem } from './delete-order-item.component';

describe('DeleteOrderItem', () => {
  let component: DeleteOrderItem;
  let fixture: ComponentFixture<DeleteOrderItem>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOrderItem ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrderItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
