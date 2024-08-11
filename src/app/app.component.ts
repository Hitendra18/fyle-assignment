import { Component, OnInit } from '@angular/core';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private userDataService: UserDataService) {}

	// initialize usersData and workoutTypes from local storage 
	// if they don't already exist
  ngOnInit(): void {
    this.userDataService.initialize();
  }
}
