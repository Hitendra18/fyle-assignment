import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUserComponent } from './view-user.component';
import { UserDataService } from '../../services/user-data.service';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';

// Mock UserDataService
class MockUserDataService {
  getWorkoutTypes() {
    return ['Running', 'Swimming', 'Cycling'];
  }
}

// Create a mock SimpleChange
function createSimpleChange(
  currentValue: any,
  previousValue: any,
  isFirstChange = false
): SimpleChange {
  return {
    currentValue,
    previousValue,
    firstChange: isFirstChange,
    isFirstChange: () => isFirstChange,
  } as SimpleChange;
}

fdescribe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let mockUserDataService: MockUserDataService;

  beforeEach(async () => {
    mockUserDataService = new MockUserDataService();

    await TestBed.configureTestingModule({
      declarations: [ViewUserComponent],
      providers: [{ provide: UserDataService, useValue: mockUserDataService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have workoutData based on selectedWorkoutList', () => {
    component.selectedUser = {
      email: 'john.doe@example.com',
      name: 'John Doe',
      workouts: [
        { index: 0, duration: 30 },
        { index: 1, duration: 45 },
      ],
    };
    component.ngOnChanges({
      selectedUser: createSimpleChange(component.selectedUser, null, true),
    });

    expect(component.workoutData).toEqual({
      labels: ['RUNNING', 'SWIMMING'],
      datasets: [
        {
          label: 'Workout Type',
          data: [30, 45],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
          pointStyle: 'cross',
        },
      ],
    });
  });

  it('should emit closeEvent when closeDialog is called', () => {
    spyOn(component.closeEvent, 'emit');
    component.closeDialog();
    expect(component.closeEvent.emit).toHaveBeenCalled();
  });

  it('should update the visibility of the dialog when closeDialog is called', () => {
    component.visible = true;
    component.closeDialog();
    expect(component.visible).toBeFalse();
  });

  it('should set selectedWorkoutList when selectedUser changes', () => {
    component.selectedUser = {
      email: 'john.doe@example.com',
      name: 'John Doe',
      workouts: [
        { index: 0, duration: 30 },
        { index: 1, duration: 45 },
      ],
    };
    component.ngOnChanges({
      selectedUser: createSimpleChange(component.selectedUser, null, true),
    });
    expect(component.selectedWorkoutList).toEqual([
      { name: 'Running', duration: 30 },
      { name: 'Swimming', duration: 45 },
    ]);
  });

  it('should populate workout types from the service', () => {
    const workoutTypes = component.workoutTypes;
    expect(workoutTypes).toEqual(['Running', 'Swimming', 'Cycling']);
  });
});
