import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { User } from '../../utils/initialData';
import { UserDataService } from '../../services/user-data.service';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnChanges, AfterViewInit {
  @Input() visible: boolean = false;
  @Input() selectedUser: User | null = null;
  // fired when this dialog is closed by user
  @Output() closeEvent = new EventEmitter<void>();
  @ViewChild('dialog') dialog: Dialog | undefined;

	constructor(private userDataService: UserDataService) {}

  selectedWorkoutList: { name: string; duration: number }[] = [];
  
	// getter for workout types from UserDataService
	get workoutTypes(): string[] {
    return this.userDataService.getWorkoutTypes();
  }

	// getter for formatted available workout types for user
	get availableWorkoutTypes(): { name: string }[] {
    return this.workoutTypes
      .filter(
        (workout) =>
          !this.selectedWorkoutList.some(
            (selected) => selected.name === workout
          )
      )
      .map((workout) => ({ name: workout }));
  }


  // Keeps track of selected workout list
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      if (this.selectedUser) {
        this.selectedWorkoutList = this.selectedUser.workouts.map((workout) => {
          return {
            name: this.workoutTypes[workout.index],
            duration: workout.duration,
          };
        });
      }
    }
  }

  // Maximize the dialog box
  ngAfterViewInit() {
    function showDialogMaximized(dialog: Dialog) {
      setTimeout(() => {
        dialog.maximize();
      }, 0);
    }
    if (this.dialog) {
      showDialogMaximized(this.dialog);
    }
  }

  // close dialog handler
  closeDialog() {
    this.visible = false;
    this.closeEvent.emit();
  }

  // update duration handler
  valueChanged(event: any, i: number) {
    const newDuration = Number(event.target?.value);
    if (newDuration) {
      this.selectedWorkoutList[i].duration = newDuration;
    }
  }

  // save changes or submit handler
  handleSubmit() {
    if (!this.selectedUser?.email) return;
    this.userDataService.updateUserWorkouts(
      this.selectedUser.email,
      this.selectedWorkoutList
    );
    this.visible = false;
    this.closeEvent.emit();
  }

  // add new workout when selected from dropdown
  handleDropDown(event: any) {
    const selectedValue = event.value;
    this.selectedWorkoutList.push({ name: selectedValue, duration: 0 });
  }

  // remove workout handler
  handleRemoveWorkout(workoutName: string) {
    this.selectedWorkoutList = this.selectedWorkoutList.filter(
      (workout) => workout.name !== workoutName
    );
  }
}
