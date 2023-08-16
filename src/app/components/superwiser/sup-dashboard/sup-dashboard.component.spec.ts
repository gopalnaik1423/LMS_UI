import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupDashboardComponent } from './sup-dashboard.component';

describe('SupDashboardComponent', () => {
  let component: SupDashboardComponent;
  let fixture: ComponentFixture<SupDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
