import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// angular imports
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddWorkoutFormComponent } from './components/add-workout-form/add-workout-form.component';

// primeNg component modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';

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
		FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
		ChartModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ChipModule,
    TableModule,
    DialogModule,
    DropdownModule,
    KeyFilterModule,
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule {}
