import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaboravljenaSifraComponent } from './zaboravljena-sifra.component';

describe('ZaboravljenaSifraComponent', () => {
  let component: ZaboravljenaSifraComponent;
  let fixture: ComponentFixture<ZaboravljenaSifraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZaboravljenaSifraComponent]
    });
    fixture = TestBed.createComponent(ZaboravljenaSifraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
