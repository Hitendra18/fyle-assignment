import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../utils/initialData';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() selectedUser: User | null = null;
  @Output() closeEvent = new EventEmitter<void>();

  constructor(private userDataService: UserDataService) {}

  get workoutTypes(): string[] {
    return this.userDataService.getWorkoutTypes();
  }
  selectedWorkoutList: { name: string; duration: number }[] = [];
  get workoutData(): any {
    return {
      labels: this.selectedWorkoutList.map((workout) =>
        workout.name.toUpperCase()
      ),
      datasets: [
        {
          label: 'Workout Type',
          data: this.selectedWorkoutList.map((workout) => workout.duration),
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
    };
  }

  chartOptions = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Workout',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'duration in minutes',
        },
      },
    },
  };

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

  closeDialog() {
    this.visible = false;
    console.log('dialog closed from view user');
    this.closeEvent.emit();
  }
}
