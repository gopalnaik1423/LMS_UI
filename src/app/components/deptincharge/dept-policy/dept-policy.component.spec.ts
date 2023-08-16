import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptPolicyComponent } from './dept-policy.component';

describe('DeptPolicyComponent', () => {
  let component: DeptPolicyComponent;
  let fixture: ComponentFixture<DeptPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
