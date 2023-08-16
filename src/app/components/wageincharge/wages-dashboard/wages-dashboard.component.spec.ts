import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesDashboardComponent } from './wages-dashboard.component';

describe('WagesDashboardComponent', () => {
  let component: WagesDashboardComponent;
  let fixture: ComponentFixture<WagesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
