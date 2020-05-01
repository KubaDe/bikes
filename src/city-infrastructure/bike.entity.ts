import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { CityInfrastructure } from './city-infrastructure.entity';

@Entity()
@ObjectType()
export class Bike {

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => Int)
  @Column({ unique: true })
  number: number;

  @Field(type => Int)
  @Column()
  type: number;

  @ManyToOne(
    type => CityInfrastructure,
    cityInfrastructure => cityInfrastructure.stations,
  )
  cityInfrastructure: CityInfrastructure;
}
