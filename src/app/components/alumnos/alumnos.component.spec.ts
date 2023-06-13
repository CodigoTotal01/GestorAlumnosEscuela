import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnusComponent } from './alumnos.component';

describe('AlumnosComponent', () => {
  let component: AlumnusComponent;
  let fixture: ComponentFixture<AlumnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
