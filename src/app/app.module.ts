import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTableComponent } from './components/user-table/user-table.component';

// primeng modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { DialogModule } from 'primeng/dialog';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { AddWorkoutFormComponent } from './components/add-workout-form/add-workout-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserFormComponent,
    UserTableComponent,
    ViewUserComponent,
    EditUserComponent,
    AddWorkoutFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
		FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    TableModule,
    ChipModule,
    DialogModule,
    KeyFilterModule,
    DropdownModule,
    ChartModule,
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule {}
