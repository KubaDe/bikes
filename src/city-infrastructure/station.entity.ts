import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { CityInfrastructure } from './city-infrastructure.entity';

@Entity()
@ObjectType()
export class Station {

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
  spot: string;

  @Field()
  @Column()
  number: number;

  @Field()
  @Column()
  placeType: string;

  @Field()
  @Column({ type: 'json' })
  bikeTypes: string;

  @Field()
  @Column()
  bikeRacks: number;

  // @Field(type => CityInfrastructure)
  @ManyToOne(
    type => CityInfrastructure,
    cityInfrastructure => cityInfrastructure.stations,
  )
  cityInfrastructure: CityInfrastructure;
}
