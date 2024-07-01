import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  //binds form input values to the userData object
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};
  currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  FavMovies: any[] = [];
  user: any = {};
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public movieCard: MovieCardComponent,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    // this.getFavMovies()
  }

  //fetch user info
  getUserProfile(): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;

    // this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    //   let movies = resp;
    //   let user = JSON.parse(localStorage.getItem('user') || '{}')
    //   this.FavMovies = movies.filter((m: any) => user.FavouriteMovies.includes(m._id))
    // })
  }


  // getFavMovies(): void {
  //   this.fetchApiData.getAllMovies().subscribe((resp: any) => {
  //     let movies = resp;
  //     let user = JSON.parse(localStorage.getItem('user') || '{}')
  //     const favorites = movies.filter((m: any) => user.FavouriteMovies.includes(m._id))
  //     return favorites;
  //   })
    
  // }

  updateUserProfile(): void {
    this.fetchApiData.updateUserInfo(this.userData).subscribe((result) => {
      console.log('updated user info!');
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('User profile updated!', 'OK', {
        duration: 2000
      });
    });
  }

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

  // //takes a movie object as an argument -> input whichever movie needs to be checked
  // isFavCheck(movie: any): any {
  //   const favorite = this.FavMovies.filter((id) => id === movie._id)
  //   return favorite.length ? true : false;
  // }

  // toggleFav(movie: any): void {
  //   const isFavorite = this.isFavCheck(movie);
  //   isFavorite
  //   ? this.removeFav(movie) : this.addFav(movie);
  // }

  // addFav(movie: any): void {
  //   console.log(movie)
  //   this.fetchApiData.addFavService(movie._id).subscribe((resp: any) => {
  //     console.log(resp)
  //     //updates current user's list of FavMovies in localStorage
  //     const user = JSON.parse(localStorage.getItem('user') || '{}');
  //     user.FavouriteMovies.push(movie._id);
  //     //updates FavMovies array
  //     this.FavMovies.push(movie._id);
  //     this.snackBar.open('Movie added to Favourites!','OK',{
  //       duration: 2000,
  //     })
  //   })
  // }

  // removeFav(movie: any): void {
  //   this.fetchApiData.removeFavService(movie._id).subscribe((resp: any) => {
  //     console.log(resp);
  //     //updates current user's list of FavMovies in localStorage
  //     const user = JSON.parse(localStorage.getItem('user') || '{}');
  //     user.FavouriteMovies = user.FavouriteMovies.filter((id: string) => id !== movie._id);
  //     localStorage.setItem('user', JSON.stringify(user))
  //     //updates FavMovies array
  //     this.FavMovies = this.FavMovies.filter((id: string) => id!== movie._id);

  //     this.snackBar.open('Movie removed from Favourites.','OK', {
  //       duration: 2000
  //     })
  //   })
  // }
}
