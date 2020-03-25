import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Station } from './station.entity';

@Entity()
export class CityInfrastructure {
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
  zoom: string;

  @Column({ type: 'json' })
  bounds: string;

  @OneToMany(
    type => Station,
    station => station.cityInfrastructure,
  )
  stations: Station[];
}
