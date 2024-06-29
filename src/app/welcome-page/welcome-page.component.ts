import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    
  }

  //function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    //"dialog" below references the "dialog" that was defined in the constructor on line 13
    this.dialog.open(UserRegistrationFormComponent, {
      //assigning the dialog width
      width: '280px'
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

}
