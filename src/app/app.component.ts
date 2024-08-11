import { Component, OnInit } from '@angular/core';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'fyle';

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.initialize();
  }
}
