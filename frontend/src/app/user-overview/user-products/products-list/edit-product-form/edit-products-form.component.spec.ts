import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductsFormComponent } from './edit-products-form.component';

describe('EditProductsFormComponent', () => {
  let component: EditProductsFormComponent;
  let fixture: ComponentFixture<EditProductsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductsFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
