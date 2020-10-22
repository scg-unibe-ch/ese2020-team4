import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueServiceListComponent } from './catalogue-service-list.component';

describe('CatalogueServiceListComponent', () => {
  let component: CatalogueServiceListComponent;
  let fixture: ComponentFixture<CatalogueServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogueServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
