import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedItemComponent } from './detailed-item.component';

describe('DetailedItemComponent', () => {
  let component: DetailedItemComponent;
  let fixture: ComponentFixture<DetailedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
