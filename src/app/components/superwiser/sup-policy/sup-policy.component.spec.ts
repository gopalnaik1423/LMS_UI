import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupPolicyComponent } from './sup-policy.component';

describe('SupPolicyComponent', () => {
  let component: SupPolicyComponent;
  let fixture: ComponentFixture<SupPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
