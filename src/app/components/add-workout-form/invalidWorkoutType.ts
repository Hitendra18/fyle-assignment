import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';

// custom validator to check if this workout already exists or not
export function invalidWorkoutType(
  userDataService: UserDataService
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const workoutTypes = userDataService.getWorkoutTypes();
    const value = control.value?.trim().toLowerCase();

    // Check if the workout type already exists (case-insensitive)
    const isInvalid = workoutTypes.some(
      (type) => type.trim().toLowerCase() === value
    );

    return isInvalid ? { workoutTypeExists: true } : null;
  };
}
