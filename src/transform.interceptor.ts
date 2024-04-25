import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformReportsInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: 'No data - zero rows fetched, selected, or processed',
          };
        } else if (Array.isArray(data)) {
          const responseArray = [];
          const element = {};
          for (let index = 0; index < data.length; index++) {
            (element['sunrise'] = data[index]?.current?.sunrise),
              (element['sunset'] = data[index]?.current?.sunset),
              (element['temp'] = data[index]?.current?.temp),
              (element['feels_like'] = data[index]?.current?.feels_like),
              (element['pressure'] = data[index]?.current?.pressure),
              (element['humidity'] = data[index]?.current?.humidity),
              (element['uvi'] = data[index]?.current?.uvi),
              (element['wind_speed'] = data[index]?.current?.wind_speed);
            responseArray.push(element);
          }
          return responseArray;
        } else if (typeof data === 'object' && data !== null) {
          const response = {};
          (response['sunrise'] = data?.current.sunrise),
            (response['sunset'] = data?.current.sunset),
            (response['temp'] = data?.current.temp),
            (response['feels_like'] = data?.current.feels_like),
            (response['pressure'] = data?.current.pressure),
            (response['humidity'] = data?.current.humidity),
            (response['uvi'] = data?.current.uvi),
            (response['wind_speed'] = data?.current.wind_speed);
          return response;
        } else {
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            data: data,
          };
        }
      }),
    );
  }
}
