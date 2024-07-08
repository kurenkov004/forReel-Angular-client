import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://for-reel-d14227c07855.herokuapp.com';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) {
  }

  /**
  * @description POST API call to register a new user
  * @param {Object} userDetails must include username, password and password. Optional: birthday
  * @returns {Observable<any>} - Observable for the API response. 
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
  * @description POST API call to login a user
  * @param {Object} userDetails must include username and password
  * @returns {Observable<any>} - Observable for the API response.
  */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/login', userDetails).pipe(
    catchError(this.handleError)  
    )
  }
  
  /**
  * @description GET API call to fetch info about current user.
  * @returns {Observable<any>} - Observable for the API response.
  */
  getOneUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get(apiUrl + `/users/${user.Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
  * @description PUT API call to update current user info.
  * @param {any} userDetails - user details to be updated.
  * @returns {Observable<any>} - Observable for the API response.
  */
  updateUserInfo(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.put(apiUrl + `/users/${user.Username}`, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
    /**
  * @description DELETE API call to delete current user.
  * @returns {Observable<any>} - Observable for the API response.
  */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.delete(apiUrl + `/users/${user.Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * @description GET API call to fetch a list of user's favourite movies.
  * @returns {Observable<any>} - Observable for the API response.
  */
  findFav(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get(apiUrl + `/users/${user.Username}/movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * @description POST API call to add a movie to current user's list of favourites.
  * @param {any} movieID - movie to be added to user's favourites.
  * @returns {Observable<any>} - Observable for the API response.
  */
  addFavService(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.post(apiUrl + `/users/` + user.Username + `/movies/` + movieID, {}, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
  * @description DELETE API call to update current user info.
  * @param {any} movieID - movie tobe removed from user's favourites.
  * @returns {Observable<any>} - Observable for the API response.
  */
  removeFavService(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.delete(apiUrl + `/users/` + user.Username + `/movies/` + movieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
  * @description GET API call to fetch an array of all movie objects present in the database.
  * @returns {Observable<any>} - Observable for the API response.
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
   * Non-typed response extraction.
   * @param {Object} res - API response.
   * @returns {any} - Extracted response data.
   */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || { };
  }

  /**
  * @description GET API call to fetch one movie by title.
  * @param {string} movieTitle - one movie title
  * @returns {Observable<any>} - Observable for the API response.
  */
  getOneMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/${movieTitle}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
  * @description GET API call to fetch genre info.
  * @param {string} genreName - one genre name
  * @returns {Observable<any>} - Observable for the API response.
  */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/genre/${genreName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
  * @description GET API call to fetch info about one director.
  * @param {string} directorName - one director name
  * @returns {Observable<any>} - Observable for the API response.
  */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/directors/${directorName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



  /**
  * @description error handling function.
  * @param {HttpErrorResponse} error - HTTP error message.
  * @returns {any} - Error details.
  */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }


}
