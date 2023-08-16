import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptAddleavesComponent } from './dept-addleaves.component';

describe('DeptAddleavesComponent', () => {
  let component: DeptAddleavesComponent;
  let fixture: ComponentFixture<DeptAddleavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptAddleavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptAddleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
