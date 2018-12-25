import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListDetailsComponent } from './customer-list-details.component';

describe('CustomerListDetailsComponent', () => {
  let component: CustomerListDetailsComponent;
  let fixture: ComponentFixture<CustomerListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
