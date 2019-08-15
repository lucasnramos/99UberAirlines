import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IAirport } from 'src/app/models/iairport';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  airports$: Observable<IAirport[]>;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.airports$ = this.http.get<IAirport[]>(`${environment.API_URL}/flight/companies`);
  }

}
