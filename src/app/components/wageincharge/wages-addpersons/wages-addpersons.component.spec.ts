import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesAddpersonsComponent } from './wages-addpersons.component';

describe('WagesAddpersonsComponent', () => {
  let component: WagesAddpersonsComponent;
  let fixture: ComponentFixture<WagesAddpersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagesAddpersonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesAddpersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
