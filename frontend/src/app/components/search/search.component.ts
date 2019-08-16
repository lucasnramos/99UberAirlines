import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAirport } from 'src/app/models/iairport';
import { IFlight } from 'src/app/models/IFlight';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  readonly startDate = new Date(2019, 1, 10);
  readonly maxDate = new Date(2019, 1, 18);
  readonly minDate = new Date(2019, 1, 10);
  airports$: Observable<IAirport[]>;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.createForm();
    this.apiService.getAirports();
    this.airports$ = this.apiService.airports;
  }

  createForm() {
    this.searchForm = this.fb.group({
      from: [{value: ''}, [Validators.required, Validators.minLength(3)]],
      to: [{value: ''}, [Validators.required, Validators.minLength(3)]],
      date: [{value: moment()}, Validators.required]
    });
  }

  onSubmit() {
    const postData = {
      from: this.searchForm.value.from,
      to: this.searchForm.value.to,
      date: this.searchForm.value.date.format('YYYY-MM-DD'),
    };
    console.log(postData);
    this.apiService.searchFlights(postData);
  }

}
