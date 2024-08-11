import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserFormComponent } from './add-user-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddUserFormComponent', () => {
  let component: AddUserFormComponent;
  let fixture: ComponentFixture<AddUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
