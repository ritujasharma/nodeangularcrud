import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachercrudComponent } from './teachercrud.component';

describe('TeachercrudComponent', () => {
  let component: TeachercrudComponent;
  let fixture: ComponentFixture<TeachercrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachercrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachercrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
