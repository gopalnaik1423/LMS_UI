import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesControlComponent } from './wages-control.component';

describe('WagesControlComponent', () => {
  let component: WagesControlComponent;
  let fixture: ComponentFixture<WagesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagesControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
