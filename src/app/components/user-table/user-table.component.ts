import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../utils/initialData';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent {
  selectedUser: User | null = null;
  viewDialogVisible = false;
  editDialogVisible = false;
  searchTerm: string = '';
  selectedWorkoutFilter: { label: string; value: string } | null = null;
  get workoutOptions(): { label: string; value: string }[] {
    return this.getWorkoutOptions();
  }

  get workoutTypes(): string[] {
    return this.userDataService.getWorkoutTypes();
  }

  constructor(private userDataService: UserDataService) {}

  get users(): User[] {
    return this.userDataService
      .getUsersData()
      .filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter((user) => {
        if (!this.selectedWorkoutFilter) return true;
        const value = this.selectedWorkoutFilter.value;
        const index = this.workoutTypes.findIndex(
          (workout) => workout === value
        );
        if (user.workouts.some((workout) => workout.index === index))
          return true;
        return false;
      });
  }

  getTotalDuration(user: any): number {
    return user.workouts.reduce(
      (total: number, workout: any) => total + workout.duration,
      0
    );
  }

  getWorkoutOptions(): { label: string; value: string }[] {
    return this.workoutTypes.map((workout) => ({
      label: workout.toUpperCase(),
      value: workout,
    }));
  }

  onView(user: User): void {
    console.log('click on view');
    this.selectedUser = user;
    this.viewDialogVisible = true;
  }

  onEdit(user: User): void {
    this.selectedUser = user;
    this.editDialogVisible = true;
  }

  onDelete(user: User): void {
    console.log('Request to delete', user);
    this.userDataService.deleteUser(user.email);
  }

  handleCloseDialog() {
    this.viewDialogVisible = false;
    this.editDialogVisible = false;
    this.selectedUser = null;
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedWorkoutFilter = null;
  }
}
