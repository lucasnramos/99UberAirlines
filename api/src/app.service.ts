import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getAirports(): string {
    return 'getAirports';
  }
  searchFlights(): string {
    return 'searchFlights';
  }
}
