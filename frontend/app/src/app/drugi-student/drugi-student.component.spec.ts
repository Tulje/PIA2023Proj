import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugiStudentComponent } from './drugi-student.component';

describe('DrugiStudentComponent', () => {
  let component: DrugiStudentComponent;
  let fixture: ComponentFixture<DrugiStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrugiStudentComponent]
    });
    fixture = TestBed.createComponent(DrugiStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
