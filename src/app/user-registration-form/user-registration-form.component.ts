import { Component, Input, OnInit } from '@angular/core';

//will control the dialog onscreen
import { MatDialogRef } from '@angular/material/dialog';

//brings in the API services
import { FetchApiDataService } from '../fetch-api-data.service';

//used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  //@Input binds form input values to the userData object which will be passed to FetchApiDataService
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  //constructor used to unitialize the imports
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
  
  }

  //this function passes userData object to the backend to create a new user
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      console.log(result)
      this.dialogRef.close(); //this will close the modal on success
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    });
  }
}
