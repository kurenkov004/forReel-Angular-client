import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  //constructor initializes the imports to fetchMovies
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  //evoked after the component has been fully mounted
  ngOnInit(): void {
    this.getMovies();

  }

  //function to get all movies and assign that data to the "movies" array declared earlier
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  //opens dialog with movie director info
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

  //opens dialog with movie genre info
  openGenreInfo(genreName: string, genreDescription: string ): void {
   this.dialog.open(GenreInfoComponent, {
    data: {
      Name: genreName,
      Description: genreDescription,
    },
    width: '800px'
   }) 
  }

  //opens dialog with movie synopsis
  openMovieSynopsis(description: string): void {
    this.dialog.open(SynopsisInfoComponent, {
      data: {
        Description: description,
      },
      width: '800px'
    })
  }

  //assigns current user's favourite movies to the FavMovies array and userData.FavoriteMovies
  getFavMovies(): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.FavouriteMovies = this.user.FavouriteMovies;
    this.FavMovies = this.user.FavouriteMovies;
    console.log('Favorite movies in getFavMovies', this.FavMovies);
  }

  //takes a movie object as an argument -> input whichever movie needs to be checked
  isFavCheck(movie: any): any {
    const MovieID = movie._id;
    if (this.FavMovies.some((id) => id === MovieID)) {
      return true;
    } else {
      return false;
    }
  }
  

  toggleFav(movie: any): void {
    const isFavorite = this.isFavCheck(movie);
    isFavorite
    ? this.removeFav(movie) : this.addFav(movie);
  }


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

