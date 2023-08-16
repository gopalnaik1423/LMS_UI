import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptTotalleavesComponent } from './dept-totalleaves.component';

describe('DeptTotalleavesComponent', () => {
  let component: DeptTotalleavesComponent;
  let fixture: ComponentFixture<DeptTotalleavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptTotalleavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptTotalleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
