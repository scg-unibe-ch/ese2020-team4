import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsItemDelete } from './products-item-delete.component';

describe('ProductsItemDelete', () => {
  let component: ProductsItemDelete;
  let fixture: ComponentFixture<ProductsItemDelete>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsItemDelete ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsItemDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
