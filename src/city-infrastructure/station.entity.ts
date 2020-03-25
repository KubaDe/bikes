import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { CityInfrastructure } from './city-infrastructure.entity';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  name: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  spot: string;

  @Column()
  number: number;

  @Column()
  placeType: string;

  @Column({ type: 'json' })
  bikeTypes: string;

  @Column()
  bikeRacks: number;

  @ManyToOne(
    type => CityInfrastructure,
    cityInfrastructure => cityInfrastructure.stations,
  )
  cityInfrastructure: CityInfrastructure;
}
