import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptReportComponent } from './dept-report.component';

describe('DeptReportComponent', () => {
  let component: DeptReportComponent;
  let fixture: ComponentFixture<DeptReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
