import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Station } from './station.entity';

@Entity()
@ObjectType()
export class CityInfrastructure {

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  uuid: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  lat: string;

  @Field()
  @Column()
  lng: string;

  @Field()
  @Column()
  zoom: string;

  @Field()
  @Column({ type: 'json' })
  bounds: string;

  @Field(type => [Station])
  @OneToMany(
    type => Station,
    station => station.cityInfrastructure,
  )
  stations: Station[];
}
