import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptDashboardComponent } from './dept-dashboard.component';

describe('DeptDashboardComponent', () => {
  let component: DeptDashboardComponent;
  let fixture: ComponentFixture<DeptDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
