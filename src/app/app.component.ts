import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'forReel-Angular-client';

  constructor(public dialog: MatDialog) {}

  //function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    //"dialog" below references the "dialog" that was defined in the constructor on line 13
    this.dialog.open(UserRegistrationFormComponent, {
      //assigning the dialog width
      width: '480px'
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '480px'
    });
  }
}
