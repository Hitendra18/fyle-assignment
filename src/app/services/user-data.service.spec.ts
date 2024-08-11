import { TestBed } from '@angular/core/testing';
import { UserDataService } from './user-data.service';
import { initialUserData, initialWorkoutTypes } from '../utils/initialData';

fdescribe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsersData', () => {
    it('should return an empty array if no data is stored', () => {
      const result = service.getUsersData();
      expect(result).toEqual([]);
    });

    it('should return stored users data', () => {
      const users = [
        { email: 'test@example.com', name: 'Test User', workouts: [] },
      ];
      localStorage.setItem('userData', JSON.stringify(users));
      const result = service.getUsersData();
      expect(result).toEqual(users);
    });
  });

  describe('getWorkoutTypes', () => {
    it('should return an empty array if no data is stored', () => {
      const result = service.getWorkoutTypes();
      expect(result).toEqual([]);
    });

    it('should return stored workout types', () => {
      const workoutTypes = ['Cardio', 'Strength'];
      localStorage.setItem('workoutTypes', JSON.stringify(workoutTypes));
      const result = service.getWorkoutTypes();
      expect(result).toEqual(workoutTypes);
    });
  });

  describe('getSingleUser', () => {
    it('should return null if user does not exist', () => {
      const result = service.getSingleUser('nonexistent@example.com');
      expect(result).toBeNull();
    });

    it('should return the user if it exists', () => {
      const users = [
        { email: 'test@example.com', name: 'Test User', workouts: [] },
      ];
      localStorage.setItem('userData', JSON.stringify(users));
      const result = service.getSingleUser('test@example.com');
      expect(result).toEqual(users[0]);
    });
  });

  describe('initialize', () => {
    it('should initialize localStorage with default values if empty', () => {
      service.initialize();
      const users = localStorage.getItem('userData');
      const workoutTypes = localStorage.getItem('workoutTypes');
      expect(users).toEqual(JSON.stringify(initialUserData));
      expect(workoutTypes).toEqual(JSON.stringify(initialWorkoutTypes));
    });

    it('should not overwrite existing localStorage data', () => {
      localStorage.setItem(
        'userData',
        JSON.stringify([
          {
            email: 'existing@example.com',
            name: 'Existing User',
            workouts: [],
          },
        ])
      );
      localStorage.setItem('workoutTypes', JSON.stringify(['ExistingWorkout']));
      service.initialize();
      const users = localStorage.getItem('userData');
      const workoutTypes = localStorage.getItem('workoutTypes');
      expect(users).toEqual(
        JSON.stringify([
          {
            email: 'existing@example.com',
            name: 'Existing User',
            workouts: [],
          },
        ])
      );
      expect(workoutTypes).toEqual(JSON.stringify(['ExistingWorkout']));
    });
  });

  describe('addUser', () => {
    it('should add a new user to localStorage', () => {
      service.addUser('New User', 'new@example.com');
      const users = service.getUsersData();
      expect(users.length).toBe(1);
      expect(users[0]).toEqual({
        email: 'new@example.com',
        name: 'New User',
        workouts: [],
      });
    });

    it('should not add a user if the email already exists', () => {
      service.addUser('Existing User', 'existing@example.com');
      service.addUser('Another User', 'existing@example.com');
      const users = service.getUsersData();
      expect(users.length).toBe(1);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user from localStorage', () => {
      service.addUser('User To Delete', 'delete@example.com');
      service.deleteUser('delete@example.com');
      const users = service.getUsersData();
      expect(users.length).toBe(0);
    });

    it('should not delete a user if the email does not exist', () => {
      service.addUser('User', 'user@example.com');
      service.deleteUser('nonexistent@example.com');
      const users = service.getUsersData();
      expect(users.length).toBe(1);
    });
  });

  describe('addWorkoutType', () => {
    it('should add a new workout type to localStorage', () => {
      service.addWorkoutType('New Workout');
      const workoutTypes = service.getWorkoutTypes();
      expect(workoutTypes).toContain('new workout');
    });

    it('should not add a workout type if it already exists', () => {
      service.addWorkoutType('Existing Workout');
      service.addWorkoutType('Existing Workout');
      const workoutTypes = service.getWorkoutTypes();
      expect(workoutTypes.length).toBe(1);
    });
  });

  describe('updateUserWorkouts', () => {
    it("should update a user's workouts", () => {
      const users = [{ email: 'user@example.com', name: 'User', workouts: [] }];
      localStorage.setItem('userData', JSON.stringify(users));
      service.addWorkoutType('Cardio');
      service.updateUserWorkouts('user@example.com', [
        { name: 'Cardio', duration: 30 },
      ]);
      const updatedUser = service.getSingleUser('user@example.com');
      expect(updatedUser?.workouts).toEqual([{ index: 0, duration: 30 }]);
    });

    it('should not update workouts if the user does not exist', () => {
      service.updateUserWorkouts('nonexistent@example.com', [
        { name: 'Cardio', duration: 30 },
      ]);
      const users = service.getUsersData();
      expect(users.length).toBe(0);
    });
  });
});
