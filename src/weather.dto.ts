import { IsNotEmpty, MinLength, IsString, IsNumber, IsUUID, IsJSON } from 'class-validator';
import { UUID } from 'crypto';

export class WeatherDto {

    @IsUUID()
    @IsNotEmpty()
    readonly report_id: UUID;

    //@IsLatitude()
    @IsNumber()
    @IsNotEmpty()
    readonly lat: number;

    //@IsLongitude()
    @IsNumber()
    @IsNotEmpty()
    readonly long: number;

    @IsString()
    readonly part: string;

    @IsString()
    readonly timezone: string;

    @MinLength(4)
    readonly timezone_offset: string;

    @IsJSON()
    readonly current: JSON;

    @IsJSON()
    readonly daily: JSON;

    @IsJSON()
    readonly hourly: JSON;

}
