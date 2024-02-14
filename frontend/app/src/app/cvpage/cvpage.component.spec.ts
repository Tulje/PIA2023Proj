import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVpageComponent } from './cvpage.component';

describe('CVpageComponent', () => {
  let component: CVpageComponent;
  let fixture: ComponentFixture<CVpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CVpageComponent]
    });
    fixture = TestBed.createComponent(CVpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
