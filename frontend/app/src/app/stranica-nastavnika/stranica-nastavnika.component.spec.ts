import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StranicaNastavnikaComponent } from './stranica-nastavnika.component';

describe('StranicaNastavnikaComponent', () => {
  let component: StranicaNastavnikaComponent;
  let fixture: ComponentFixture<StranicaNastavnikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StranicaNastavnikaComponent]
    });
    fixture = TestBed.createComponent(StranicaNastavnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
