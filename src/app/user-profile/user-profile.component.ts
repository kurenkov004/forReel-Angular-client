import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

/**
 * @description Component representing the user profile page.
 * @selector 'app-user-profile'
 * @templateUrl './user-profile.component.html'
 * @styleUrls ['./user-profile.component.scss']
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  //binds form input values to the userData object
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavouriteMovies: [] };
  
  currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  // FavMovies: any[] = [];
  FavMovies: any[] = this.currentUser.FavouriteMovies;
  user: any = {};
  movies: any[] = [];

    /**
   * @constructor - Constructor for UserProfileComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MovieCardComponent} movieCard - initialises the MovieCard import.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   * @param {Router} router - Router service for navigation.
   * @param {MatDialog} dialog - Material dialog service for opening dialogs.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public movieCard: MovieCardComponent,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavMovies()
  }

  /**
   * Function for getting current user info.
   * @returns users username, email, birthday, and favorite movies.
   */
  getUserProfile(): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavMovies = response.filter((movie: any) => this.user.FavouriteMovies.includes(movie._id))
    })

  }

  /**
   * Function for updating user info.
   * @returns message "User profile updated!" and updates localStorage user object.
   */
  updateUserProfile(): void {
    this.fetchApiData.updateUserInfo(this.userData).subscribe((result) => {
      console.log('updated user info!');
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('User profile updated!', 'OK', {
        duration: 2000
      });
    });
  }

    /**
   * Function for deleting current user.
   * @returns message "User profile has been deleted." and navigates back to welcome page.
   */
  deleteUserProfile(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('User profile has been deleted.', 'OK', {
        duration: 2000
      });
    })
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    })
  }

    /**
   * Function for getting a list of All movies present in database.
   * @returns all movies & assigns them to empty this.movies array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  /**
   * Function that will open the dialog when director button is clicked.
   * @param {string} name - Name of the director.
   * @param {string} bio - Biography of the director.
   * @param {string} birth - Birth date of the director.
   * @returns a dialog with director name and info.
   */
  openDirectorInfo(name: string, bio: string, birth: string ): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '800px'
    });
  }

 /**
   * Function that will open the dialog when genre button is clicked.
   * @param {string} genreName - Name of the genre.
   * @param {string} genreDescriptionescription - Description of the genre.
   * @returns a dialog with genre name and description.
   */
  openGenreInfo(genreName: string, genreDescription: string ): void {
   this.dialog.open(GenreInfoComponent, {
    data: {
      Name: genreName,
      Description: genreDescription,
    },
    width: '800px'
   }) 
  }

  /**
   * Function that will open the dialog when synopsis button is clicked
   * @param {string} description - Description of the movie.
   * @returns a dialog with the movie synopsis.
   */
  openMovieSynopsis(description: string): void {
    this.dialog.open(SynopsisInfoComponent, {
      data: {
        Description: description,
      },
      width: '800px'
    })
  }


  /**
   * Function to get favMovie list.
   * @returns Favorite movies of user; full movie objects (including director, genre info, etc).
  */
  getFavMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      let movies = resp;
      let user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log('resp', resp, user);
      const favorites = movies.filter((m: any) =>
        user.FavouriteMovies.includes(m._id)
      );
      this.FavMovies = favorites;
    });
  }

    /**
   * Function to check if movie is a favorite movie.
   * @param movie  - Movie object to check.
   * @returns {boolean} - Boolean indicating whether the movie is a favorite.
   */
  isFavCheck(movie: any): any {
    const MovieID = movie._id;
    if (this.FavMovies.some((id) => id === MovieID)) {
      return true;
    } else {
      return false;
    }
  }
  
    /**
   * Function toggle favMovie by icon button
   * @param {any} movie - Movie to toggle favorite icon for. 
   */
  toggleFav(movie: any): void {
    const isFavorite = this.isFavCheck(movie);
    isFavorite
    ? this.removeFav(movie) : this.addFav(movie);
  }

    /**
   * Function to add movie to FavMovies array
   * @param {any} movie - Movie to add to favorite movies.
   * @returns Message "Movie added to your favorites!", updates localStorage and FavMovies array
   */
  addFav(movie: any): void {
    console.log(movie)
    this.fetchApiData.addFavService(movie._id).subscribe((resp: any) => {
      console.log(resp)
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      //Check if FavouriteMovies exists and if not, initialize it
      if (!user.FavouriteMovies) {
        user.FavouriteMovies = [];
      }
      // Add the movie ID to the user's list of favorite movies
      user.FavouriteMovies.push(movie._id);

      //update localStorage with new user object
      localStorage.setItem('user', JSON.stringify(user));
      
      //update FavMovies array
      this.FavMovies.push(movie._id)
      this.snackBar.open('Movie added to Favourites!','OK',{
        duration: 2000,
      })
    })
  }

      /**
   * Function to remove a movie from FavMovies array.
   * @param {any} movie - Movie to delete from favorite movies.
   * @returns Message "Movie removed from Favourites"
   */
  removeFav(movie: any): void {
    console.log(movie)
    this.fetchApiData.removeFavService(movie._id).subscribe((resp: any) => {
      console.log(resp);
      //updates current user's list of FavMovies in localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.FavouriteMovies = user.FavouriteMovies.filter((id: string) => id !== movie._id);
      localStorage.setItem('user', JSON.stringify(user))
      //updates FavMovies array
      this.FavMovies = this.FavMovies.filter((id: string) => id!== movie._id);

      this.snackBar.open('Movie removed from Favourites.','OK', {
        duration: 2000
      })
    })
  }
}
