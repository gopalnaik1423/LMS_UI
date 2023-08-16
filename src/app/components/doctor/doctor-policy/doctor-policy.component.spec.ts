import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPolicyComponent } from './doctor-policy.component';

describe('DoctorPolicyComponent', () => {
  let component: DoctorPolicyComponent;
  let fixture: ComponentFixture<DoctorPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
