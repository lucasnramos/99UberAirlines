import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('flight')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAirports(): string {
    return this.appService.getAirports();
  }
  @Post('companies')
  searchFlights(): string {
    return this.appService.searchFlights();
  }
}
