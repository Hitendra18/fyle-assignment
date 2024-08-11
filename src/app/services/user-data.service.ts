import { Injectable } from '@angular/core';
import {
  initialUserData,
  initialWorkoutTypes,
  type User,
} from '../utils/initialData';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private readonly userStorageKey = 'userData';
  private readonly workoutTypesStorageKey = 'workoutTypes';

  constructor() {}

	// returns list of all users from localStorage
  getUsersData(): User[] {
    const existingData = localStorage.getItem(this.userStorageKey);
    return JSON.parse(existingData || '[]');
  }

	// returns list of all workout types from localStorage
  getWorkoutTypes(): string[] {
    return JSON.parse(
      localStorage.getItem(this.workoutTypesStorageKey) || '[]'
    );
  }

	// returns user by email if exists from localStorage
  getSingleUser(email: string): User | null {
    const users = this.getUsersData();
    email = email.trim();

    let user = users.find((item) => item.email === email);
    if (user) {
      return user;
    }

    return null;
  }

  // Initialize everything: Clear localStorage and add new entries
  initialize(): void {
    if (!localStorage.getItem(this.userStorageKey)) {
      localStorage.setItem(
        this.userStorageKey,
        JSON.stringify(initialUserData)
      );
    }

    if (!localStorage.getItem(this.workoutTypesStorageKey)) {
      localStorage.setItem(
        this.workoutTypesStorageKey,
        JSON.stringify(initialWorkoutTypes)
      );
    }
  }

	// checks if user exists if not then adds to the localStorage
  addUser(name: string, email: string): void {
    const users = this.getUsersData();
    email = email.trim();
    name = name.trim();

    if (users.some((user) => user.email === email)) {
      console.error(`User with the email ${email} already exists.`);
      return;
    }

    users.push({ email, name, workouts: [] });
    localStorage.setItem(this.userStorageKey, JSON.stringify(users));

    console.log('New user added to userData in localStorage');
  }

	// checks if user exists if yes then deletes it from localStorage
  deleteUser(email: string): void {
    const users = this.getUsersData();
    email = email.trim();

    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex === -1) {
      console.error(`User with the email ${email} does not exist.`);
      return;
    }

    users.splice(userIndex, 1);
    localStorage.setItem(this.userStorageKey, JSON.stringify(users));

    console.log('One user removed from the localStorage');
  }

	// checks if workout type exists if not then adds to the localStorage
  addWorkoutType(workoutName: string): void {
    workoutName = workoutName.toLowerCase().trim();

    let workoutTypes = this.getWorkoutTypes();

    if (workoutTypes.includes(workoutName)) {
      console.error(`Workout type "${workoutName}" already exists.`);
      return;
    }

    workoutTypes.push(workoutName);
    localStorage.setItem(
      this.workoutTypesStorageKey,
      JSON.stringify(workoutTypes)
    );

    console.log(
      `Workout type "${workoutName}" added to workoutTypes in localStorage`
    );
  }

	// checks if user exists if yes then updates it's workouts in localStorage
  updateUserWorkouts(
    email: string,
    workouts: { name: string; duration: number }[]
  ) {
    const users = this.getUsersData();
    const userIndex = users.findIndex((item) => item.email === email);

		// user doesn't exists
    if (userIndex === -1) return;

    const workoutTypes = this.getWorkoutTypes();

    let formattedWorkouts: { index: number; duration: number }[] = [];
    for (let i = 0; i < workouts.length; i++) {
      const index = workoutTypes.findIndex(
        (item) => item === workouts[i].name.toLowerCase()
      );
      formattedWorkouts.push({ index, duration: workouts[i].duration });
    }

    users[userIndex].workouts = formattedWorkouts;
    localStorage.setItem(this.userStorageKey, JSON.stringify(users));
  }
}
