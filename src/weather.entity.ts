import { UUID } from 'crypto';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class WeatherReports extends Model<WeatherReports> {
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
  })
  report_id: UUID;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  lat: number;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  long: number;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  part: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  timezone: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  timezone_offset: string;
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  current: JSON;
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  daily: JSON;
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  hourly: JSON;
}
