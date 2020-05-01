import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class Snapshot {
  @PrimaryGeneratedColumn()
  id: number;


}
