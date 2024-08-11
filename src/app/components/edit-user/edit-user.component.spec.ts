import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
