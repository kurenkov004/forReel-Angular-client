import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component representing the navbar.
 * @selector 'app-navbar'
 * @templateUrl './navbar.component.html'
 * @styleUrls ['./navbar.component.scss']
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

    /**
   * @constructor - Constructor for NavbarComponent. 
   * @param {Router} router - Router service for navigation.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   */
  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    
  }

    /**
   * Function to navigate to movies page.
   */
  public goToMovies(): void {
    this.router.navigate(['movies'])
  }
  /**
   * Function to navigate to user's profile page.
   */
  public openProfile(): void {
    this.router.navigate(['profile'])
  }
  /**
   * Function to log out current user.
   * @returns "User logged out."
   */
  public logout(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('User logged out.', 'OK', {
      duration:2000
    });
  }
}
