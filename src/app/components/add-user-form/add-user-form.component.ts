import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.css',
})
export class AddUserFormComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  handleSubmit() {
    if (this.userForm.valid) {
      const { name, email } = this.userForm.value;
      this.userDataService.addUser(name, email);
      console.log('Form submitted', this.userForm.value);
      this.userForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
