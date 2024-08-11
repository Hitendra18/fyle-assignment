import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';

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
