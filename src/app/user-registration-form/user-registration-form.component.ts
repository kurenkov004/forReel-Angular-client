import { Component, Input, OnInit } from '@angular/core';

//will control the dialog onscreen
import { MatDialogRef } from '@angular/material/dialog';

//brings in the API services
import { FetchApiDataService } from '../fetch-api-data.service';

//used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component representing the signup form.
 * @selector 'app-user-registration-form'
 * @templateUrl './user-registration-form.component.html'
 * @styleUrls ['./user-registration-form.component.scss']
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  //@Input binds form input values to the userData object which will be passed to FetchApiDataService
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  /**
   * @constructor - Constructor for UserProfileComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Material dialog service for opening dialogs.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
  
  }

    /**
   * Function for sending userData object to the backend to create a new user.
   * @returns Message "User registration successful" / "User registration successful".
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      console.log(result)
      this.dialogRef.close(); //this will close the modal on success
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (error) => {
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    });
  }
}
