import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as yup from 'yup';

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

  @Column({type: 'json'})
  bounds: string;

}



//   num_places: yup.string().required(),
//   refresh_rate: yup.string().required(),
//   bounds: yup.string().required(),
//   booked_bikes: yup.string().required(),
//   set_point_bikes: yup.string().required(),
//   available_bikes: yup.string().required(),
//   return_to_official_only: yup.string().required(),
//   bike_types: yup.string().required(),
//   website: yup.string().required(),
