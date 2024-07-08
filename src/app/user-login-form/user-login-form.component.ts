import { Component, Input, OnInit } from '@angular/core';

//to control the dialog screen
import { MatDialogRef } from '@angular/material/dialog';

//links in the API services file
import { FetchApiDataService } from '../fetch-api-data.service';

//used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @description Component representing the login form.
 * @selector 'app-user-login-form'
 * @templateUrl './user-login-form.component.html'
 * @styleUrls ['./user-login-form.component.scss']
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  @Input() userLoginData = { Username: '', Password: ''};

    /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Material dialog service for opening user login dialog.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   * @param {Router} router - Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    ) {}

  ngOnInit(): void {
    
  }

    /**
   * Function responsible for sending the form inputs to the backend. 
   * @returns feedback message depending on user login success/failure
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userLoginData).subscribe((result) => {
      console.log(result)
      localStorage.setItem('user', JSON.stringify(result.user))
      localStorage.setItem('token', result.token)
      this.dialogRef.close(); //this will close login modal on success
      this.snackBar.open('User login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (result) => {
      this.snackBar.open('User login failed', 'OK', {
        duration: 2000
      });
    });
  }

}
