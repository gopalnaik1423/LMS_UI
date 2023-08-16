import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupReportComponent } from './sup-report.component';

describe('SupReportComponent', () => {
  let component: SupReportComponent;
  let fixture: ComponentFixture<SupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
