import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios'
import { firstValueFrom, catchError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { WeatherReports } from './weather.entity';
import { WeatherDto } from './weather.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  //health check 
  health(): string {
    return 'Fetching weather: http://localhost:3000/api/v1/weather';
  }

  // Fetches weather data based on the provided query params from DB
  // Uses interceptor for response formatting
  async getWeatherForecasts(lat: number = -84.0832646, lon: number = 37.1289771, part: string = '') {
    //Get from DB
    const report = await WeatherReports.findAll({
      where: {
        lat: lat,
        long: lon,
        part: part
      },
    });
    //console.log(JSON.stringify(report, null, 2))
    //Present it as in sample-response.json using interseptor
    return report
  }

  // This function fetches weather API and pushes it to database
  async postWeatherForecasts(lat: number = -84.0832646, lon: number = 37.1289771, part: string = ''):Promise<JSON> {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${process.env.appid}`;
    const { data } = await firstValueFrom(this.httpService.get(url).pipe(
      catchError((error: AxiosError) => {
        console.error(error.response.data);
        throw 'An error happened!';
      }))
    );

    //Save Weather Report to DB
    const report: WeatherDto = await WeatherReports.create({
        report_id: uuidv4(),
        lat: data.lat,
        long: data.lon,
        part: part,
        timezone: data.timezone,
        timezone_offset: data.timezone_offset,
        current: data.current,
        daily: data.daily,
        hourly: data.hourly
      });

    return data;
  }

}