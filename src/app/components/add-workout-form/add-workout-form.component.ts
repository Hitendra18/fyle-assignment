import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { invalidWorkoutType } from './invalidWorkoutType';

@Component({
  selector: 'app-add-workout-form',
  templateUrl: './add-workout-form.component.html',
  styleUrl: './add-workout-form.component.css',
})
export class AddWorkoutFormComponent {
  workoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService
  ) {
    this.workoutForm = this.fb.group({
      workoutName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          invalidWorkoutType(this.userDataService),
        ],
      ],
    });
  }

  get workoutName() {
    return this.workoutForm.get('workoutName');
  }

  handleSubmit() {
    if (this.workoutForm.valid) {
      let { workoutName } = this.workoutForm.value;
      if (workoutName) workoutName = workoutName.trim().toLowerCase();
			
      this.userDataService.addWorkoutType(workoutName);
      this.workoutForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
