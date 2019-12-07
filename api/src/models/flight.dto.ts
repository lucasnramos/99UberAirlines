import { Airport } from './airport.model';

export class GetFlightDto {
  readonly from: Airport['aeroporto'];
  readonly to: Airport['aeroporto'];
  readonly date: string;
}
