import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesPolicyComponent } from './wages-policy.component';

describe('WagesPolicyComponent', () => {
  let component: WagesPolicyComponent;
  let fixture: ComponentFixture<WagesPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagesPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
