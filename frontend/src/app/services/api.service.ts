import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAirport } from '../models/iairport';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IFlight } from '../models/IFlight';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private airports$: Observable<IAirport[]>;
  private flights$ = new Observable<IFlight[]>();

  constructor(
    private http: HttpClient,
  ) {}

  get airports() { return this.airports$; }
  get flights() { return this.flights$; }

  public getAirports() {
    this.airports$ = this.http.get<IAirport[]>(`${environment.API_URL}/flight/companies`);
  }

  public searchFlights(data: any) {
    this.flights$ = this.http.post<IFlight[]>(`${environment.API_URL}/flight`, data);
  }
}
