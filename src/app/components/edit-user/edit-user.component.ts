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
export class EditUserComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() selectedUser: User | null = null;
  @Output() closeEvent = new EventEmitter<void>();
  @ViewChild('dialog') dialog: Dialog | undefined;

  selectedWorkoutList: { name: string; duration: number }[] = [];
  get workoutTypes(): string[] {
    return this.userDataService.getWorkoutTypes();
  }
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

  constructor(private userDataService: UserDataService) {}

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
  ngAfterViewInit() {
    // if (this.dialog) {
    //   this.dialog.maximize();
    // }
    // let myDialog = this.dialog

    function showDialogMaximized(dialog: Dialog) {
      setTimeout(() => {
        dialog.maximize();
      }, 0);
    }
    if (this.dialog) {
      showDialogMaximized(this.dialog);
    }
  }

  closeDialog() {
    this.visible = false;
    this.closeEvent.emit();
  }

  valueChanged(event: any, i: number) {
    const newDuration = Number(event.target?.value);
    if (newDuration) {
      this.selectedWorkoutList[i].duration = newDuration;
    }
  }

  handleSubmit() {
    if (!this.selectedUser?.email) return;
    this.userDataService.updateUserWorkouts(
      this.selectedUser.email,
      this.selectedWorkoutList
    );
    this.visible = false;
    this.closeEvent.emit();
  }

  handleDropDown(event: any) {
    const selectedValue = event.value;
    this.selectedWorkoutList.push({ name: selectedValue, duration: 0 });
  }

  handleRemoveWorkout(workoutName: string) {
    this.selectedWorkoutList = this.selectedWorkoutList.filter(
      (workout) => workout.name !== workoutName
    );

    console.log('After removing', this.selectedWorkoutList);
  }
}
