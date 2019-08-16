import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAirport } from '../models/iairport';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { IFlight } from '../models/IFlight';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private airports$: Observable<IAirport[]>;
  private flights$ = new BehaviorSubject<IFlight[]>([]);

  constructor(
    private http: HttpClient,
  ) {}

  get airports() { return this.airports$; }
  get flights() { return this.flights$.asObservable(); }

  public getAirports() {
    this.airports$ = this.http.get<IAirport[]>(`${environment.API_URL}/flight/companies`);
  }

  public async searchFlights(data: any) {
    const nextFlights = await this.http.post<IFlight[]>(`${environment.API_URL}/flight`, data).toPromise();
    this.flights$.next(nextFlights);
  }
}
