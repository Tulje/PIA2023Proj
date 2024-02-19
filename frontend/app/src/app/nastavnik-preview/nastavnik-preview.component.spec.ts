import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikPreviewComponent } from './nastavnik-preview.component';

describe('NastavnikPreviewComponent', () => {
  let component: NastavnikPreviewComponent;
  let fixture: ComponentFixture<NastavnikPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikPreviewComponent]
    });
    fixture = TestBed.createComponent(NastavnikPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
