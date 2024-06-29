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
  users: any[] = [];
  FavMovies: any[] = this.currentUser.FavouriteMovies; //will be populated with current user's favorite movies
  // isFav: boolean = false;


  //constructor initializes the imports to fetchMovies
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  //evoked after the component has been fully mounted
  ngOnInit(): void {
    this.getMovies();
    // this.getFavMovies();
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
      width: '300px'
    });
  }

  //opens dialog with movie genre info
  openGenreInfo(genreName: string, genreDescription: string ): void {
   this.dialog.open(GenreInfoComponent, {
    data: {
      Name: genreName,
      Description: genreDescription,
    },
    width: '300px'
   }) 
  }

  //opens dialog with movie synopsis
  openMovieSynopsis(description: string): void {
    this.dialog.open(SynopsisInfoComponent, {
      data: {
        Description: description,
      },
      width: '300px'
    })
  }

  // getFavMovies(): void {
  //   this.fetchApiData.findFav().subscribe((resp: any) => {
  //     this.FavMovies = resp;
  //     return this.FavMovies;
  //   })
  // }

  //takes a movie object as an argument -> input whichever movie needs to be checked
  isFavCheck(movie: any): any {
    const favorite = this.FavMovies.filter((id) => id === movie._id)
    return favorite.length ? true : false;
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
      //updates current user's list of FavMovies in localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.FavouriteMovies.push(movie._id);
      //updates FavMovies array
      this.FavMovies.push(movie._id);
      this.snackBar.open('Movie added to Favourites!','OK',{
        duration: 2000,
      })
    })
  }

  removeFav(movie: any): void {
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
