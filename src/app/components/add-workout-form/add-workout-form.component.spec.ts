import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkoutFormComponent } from './add-workout-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddWorkoutFormComponent', () => {
  let component: AddWorkoutFormComponent;
  let fixture: ComponentFixture<AddWorkoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWorkoutFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
