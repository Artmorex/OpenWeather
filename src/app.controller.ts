import { Controller, Get, Post, Param, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TransformReportsInterceptor } from "./transform.interceptor";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  healthCheck(): string {
    return this.appService.health();
  }

  @UseInterceptors(TransformReportsInterceptor)
  @Get('/weather?')
  getWeatherForecasts(@Query('lat') lat: number, @Query('long') long: number, @Query('part') part?: string): Promise<object> {
    return this.appService.getWeatherForecasts(lat, long, part);
  }

  @Post('/weather?')
  postWeatherForecasts(@Query('lat') lat: number, @Query('long') long: number, @Query('part') part?: string): Promise<object> {
    return this.appService.postWeatherForecasts(lat, long, part);
  }
}
