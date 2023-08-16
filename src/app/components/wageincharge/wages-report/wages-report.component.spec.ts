import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesReportComponent } from './wages-report.component';

describe('WagesReportComponent', () => {
  let component: WagesReportComponent;
  let fixture: ComponentFixture<WagesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
