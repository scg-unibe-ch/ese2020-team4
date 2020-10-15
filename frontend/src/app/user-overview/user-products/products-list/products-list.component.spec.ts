import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemListComponent } from './products-list.component';

describe('UserItemListComponent', () => {
  let component: UserItemListComponent;
  let fixture: ComponentFixture<UserItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
