import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueProductsListComponent } from './catalogue-products-list.component';

describe('CatalogueProductsListComponent', () => {
  let component: CatalogueProductsListComponent;
  let fixture: ComponentFixture<CatalogueProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogueProductsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
