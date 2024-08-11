import {
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
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() selectedUser: User | null = null;
  @Output() closeEvent = new EventEmitter<void>();
  @ViewChild('dialog') dialog: Dialog | undefined;

  constructor(private userDataService: UserDataService) {}

  // get workout types from UserDataService
  get workoutTypes(): string[] {
    return this.userDataService.getWorkoutTypes();
  }

  get workoutList(): { name: string; duration: number }[] {
    const email = this.selectedUser?.email;
    if (!email) return [];
    const user = this.userDataService.getSingleUser(email);
    if (!user) return [];

    return (
      user.workouts.map((workout) => ({
        name: this.workoutTypes[workout.index],
        duration: workout.duration,
      })) || []
    );
  }

  // getter for user's workout Data and formatted to plot the bar chart
  get workoutData(): any {
    return {
      labels: this.workoutList.map((workout) => workout.name.toUpperCase()),
      datasets: [
        {
          label: 'Workout Type',
          data: this.workoutList.map((workout) => workout.duration),
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

  // bar chart options
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

  // opens dialog in maximized mode
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible && this.dialog) {
      this.dialog!.maximize();
    }
  }

  // close dialog box handler
  closeDialog() {
    this.visible = false;
    this.closeEvent.emit();
  }
}
