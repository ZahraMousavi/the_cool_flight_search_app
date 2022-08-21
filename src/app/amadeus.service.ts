import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { Location } from './location';


@Injectable({
  providedIn: 'root'
})
export class AmadeusService {

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getFromAPI = (url:string) => {
    return this.http.get<any[]>(url, {headers: this.headers}).pipe(
      catchError(AmadeusService.handleError)
    );
  };

  postToAPI = (url: string, body: any) => {
    let text = JSON.stringify(body);
    return this.http.post<any>(url, text, {headers: this.headers}).pipe(
      catchError(AmadeusService.handleError)
    )
  };

  confirmFlight = (body: any) => {
    const confirmFlightUrl = `http://localhost:5000/flight-confirmation`;
    return this.postToAPI(confirmFlightUrl, body)
  };

  bookFlight = (body: any) => {
    const bookFlightUrl = `http://localhost:5000/flight-booking`;
    return this.postToAPI(bookFlightUrl, body)
  };

  // @ts-ignore
  getCityAndAirport = (city: string) : Observable<Location[]>  => {
    const getCityAndAirportUrl = `http://localhost:5000/city-and-airport-search/${city}`;
    return this.getFromAPI(getCityAndAirportUrl);
  };

  getFlights = (originCode: string, destinationCode: string, dateOfDeparture: string): Observable<any[]> => {
    const flightSearchUrl = `http://localhost:5000/flight-search?originCode=${originCode}&destinationCode=${destinationCode}&dateOfDeparture=${dateOfDeparture}`;
    return this.getFromAPI(flightSearchUrl);
};

  static handleError = (err: HttpErrorResponse): Observable<never> => {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  };

}
