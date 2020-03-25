import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { CityInfrastructure } from './city-infrastructure.entity';

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: number;

  @Column()
  type: number;

  @ManyToOne(
    type => CityInfrastructure,
    cityInfrastructure => cityInfrastructure.stations,
  )
  cityInfrastructure: CityInfrastructure;
}
