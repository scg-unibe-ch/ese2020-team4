import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSoldComponent } from './user-sold.component';

describe('UserSoldComponent', () => {
  let component: UserSoldComponent;
  let fixture: ComponentFixture<UserSoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
