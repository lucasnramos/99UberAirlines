import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IFlight } from 'src/app/models/IFlight';
import { tap, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  // flights$: Observable<IFlight[]>;
  flights: IFlight[];
  filters: ['valor', 'tempo_voo'];
  totalCost: number;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // this.flights$ = this.apiService.flights;
    this.apiService.flights.subscribe((flights: IFlight[]) => {
      this.flights = flights.map((flight) => {
        // Calculate total cost
        flight.valorTotal = this.calculateTotalCost(flight);
        // calculate total fligth time
        flight.tempoTotalVoo = this.calculateTotalFlightTime(flight);
        return flight;
      });
    });
  }

  calculateTotalFlightTime(flight: IFlight) {
    return flight.voos.reduce((time, voo) => {
      const saida = moment(voo.saida, 'H:mm');
      const chegada = moment(voo.chegada, 'H:mm');
      return time += (chegada.hours() - saida.hours());
    }, 0);
  }

  calculateTotalCost(flight: IFlight) {
    const totalCost = flight.voos.reduce((cost, _flight) => {
      return cost + _flight.valor;
    }, 0);
    return totalCost;
  }

  sortFlights(event: any) {
    if (event.value === 'valor') {
      this.flights.sort((a, b) => a.valorTotal - b.valorTotal);
    } else {
      this.flights.sort((a, b) => a.tempoTotalVoo - b.tempoTotalVoo);
      console.log('sorting by time');
    }
  }

}
