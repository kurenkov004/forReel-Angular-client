import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component representing the movie card.
 * @selector 'app-movie-card'
 * @templateUrl './movie-card.component.html'
 * @styleUrls ['./movie-card.component.scss']
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {

  movies: any[] = []; //array of type "any" that will store all the info from the movies returned by the API
  currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  // FavMovies: any[] = [];
  FavMovies: any[] = this.currentUser.FavouriteMovies;
  user: any = {};
  userData = { Username: "", FavouriteMovies: [] };

 /**
   * @constructor - Constructor for MovieCardComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatDialog} dialog - Material dialog service for opening dialogs.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications to users.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  //evoked after the component has been fully mounted
  ngOnInit(): void {
    this.getMovies();

  }

    /**
   * Function for getting all movies.
   * @returns All movies, assigns the returned array to this.movies empty array declared earlier
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
   * Function to get favMovie list; only the _ids of the FavouriteMovies, not full movie objects.
   * @returns assigns current user's fav movies to the FavMovies array and the userData.FavoriteMovies array.
   */
  getFavMovies(): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.FavouriteMovies = this.user.FavouriteMovies;
    this.FavMovies = this.user.FavouriteMovies;
    console.log('Favorite movies in getFavMovies', this.FavMovies);
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

