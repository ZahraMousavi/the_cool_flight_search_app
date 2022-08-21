import { Component, OnInit } from '@angular/core';
import { AmadeusService } from '../amadeus.service'
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  from: any = "";
  fromLocation: any = [];
  origin: any;

  to: any = "";
  toLocation: any = [];
  destination: any;

  date: any = "";

  flights: any;
  flightTemplate: boolean = false;

  booked: boolean = false;

  first: string = "";
  last: string= "";

  wait: boolean = false;

  constructor(
    private amadeusService: AmadeusService,
  ) {
  }

  getFromLocation = () => {
    if (this.from.length > 3) {
      this.amadeusService.getCityAndAirport(this.from).pipe(
        // @ts-ignore
        tap(jsonResponse => this.fromLocation = jsonResponse.data),
        tap(() => {
          let element = document.querySelector(".location_from .mat-grid-tile-content");
          if (element){
            console.log(element);
            // @ts-ignore
            element.style.overflowY = 'scroll';
          }
        }),
        catchError(error => this.handleError(error)),
      ).subscribe();
    }
  };

  getOrigin = (location: any) => {
    this.origin = location;
    this.from = location.name + ' (' + location.subType + ')';
    this.fromLocation = [];
    let element = document.querySelector(".location_from .mat-grid-tile-content");
    if (element){
      // @ts-ignore
      element.style.overflowY = 'auto';
    }
  };

  getToLocation = () => {
    if (this.to.length > 3) {
      this.amadeusService.getCityAndAirport(this.to).pipe(
        // @ts-ignore
        tap(jsonResponse => this.toLocation = jsonResponse.data),
        tap(() => {
          let element = document.querySelector(".location_to .mat-grid-tile-content");
          if (element){
            // @ts-ignore
            element.style.overflowY = 'scroll';
          }
        }),
        catchError(error => this.handleError(error)),
      ).subscribe();
    }
  };

  getDestination = (location: any) => {
    this.destination = location;
    this.to = location.name + ' (' + location.subType + ')';
    this.toLocation = [];
    let element = document.querySelector(".location_to .mat-grid-tile-content");
    if (element){
      // @ts-ignore
      element.style.overflowY = 'auto';
    }
  };


  onFindFlight = () =>  {
    if (this.origin?.iataCode === undefined) {
      alert("Please choose a from airport")
    }
    else if (this.destination?.iataCode === undefined) {
      alert("Please choose a to airport")
    }
    else if (this.date === "" || this.date === null) {
      alert("Please choose a date")
    }
    else {
      this.wait = true;
      console.log('please wait', this.date);
      this.amadeusService.getFlights(this.origin.iataCode, this.destination.iataCode, this.date.format("YYYY-MM-DD")).pipe(
        tap(() => this.wait = false),
        tap(() => console.log('end waiting')),
        // @ts-ignore
        tap(jsonResponse => this.flights = jsonResponse.data),
        tap(() => this.flightTemplate = true),
        catchError(error => this.handleError(error)),
      ).subscribe();
    }

  };

  onBookFlight = (flight: any) => {

    if (this.first === "" && this.last === "") {
      alert("Enter your first and last name");
      return;
    }

    const data = { flight: flight };
    const name = {
      first: this.first,
      last: this.last
    };
    const dataForBookingFlight = { flight: flight, name: name };
    this.amadeusService.confirmFlight(data).pipe(
      catchError(error => this.handleError(error)),
      switchMap(()=>this.amadeusService.bookFlight(dataForBookingFlight)),
      tap(() => this.booked  = true),
      tap(() => this.flightTemplate = false),
      tap(() => this.flights = []),
      catchError(error => this.handleError(error)),
    ).subscribe();
  };


  // @ts-ignore
  handleError = (error) => {
    console.error(error.message);
    return EMPTY;
  }

}
