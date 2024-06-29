import { Component, Input, OnInit } from '@angular/core';

//to control the dialog screen
import { MatDialogRef } from '@angular/material/dialog';

//links in the API services file
import { FetchApiDataService } from '../fetch-api-data.service';

//used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  @Input() userLoginData = { Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    ) {}

  ngOnInit(): void {
    
  }

  //this function sends user inputs to backend, returns feedback message depending on login success/failure
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
